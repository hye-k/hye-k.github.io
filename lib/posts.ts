import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'
import { tagToSlug, slugToTag, createTagSlugMap } from './slugs'

// Use content/published if it exists, otherwise fall back to posts
const contentDir = path.join(process.cwd(), 'content', 'published')
const postsDirectory = fs.existsSync(contentDir) ? contentDir : path.join(process.cwd(), 'posts')

// Build a map of { filename (without .md) -> slug } from frontmatter
function buildFilenameToSlugMap(): Record<string, string> {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  const map: Record<string, string> = {}
  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName)
    const { data } = matter(fs.readFileSync(filePath, 'utf8'))
    const name = fileName.replace(/\.md$/, '')
    map[name] = data.slug || name
  }
  return map
}

function convertObsidianLinks(content: string, filenameToSlug: Record<string, string>): string {
  // Convert image embeds: ![[image.png]] -> ![image](/content/assets/images/image.png)
  content = content.replace(/!\[\[([^\]]+)\]\]/g, (match, imagePath) => {
    const fileName = imagePath.split('/').pop()
    return `![${fileName}](/content/assets/images/${fileName})`
  })

  // Convert wikilinks with custom text: [[link|Display Text]] -> [Display Text](/posts/slug)
  content = content.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (match, link, displayText) => {
    const slug = filenameToSlug[link.trim()] ?? link.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return `[${displayText}](/posts/${slug})`
  })

  // Convert simple wikilinks: [[Link]] -> [Link](/posts/slug)
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, link) => {
    const slug = filenameToSlug[link.trim()] ?? link.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return `[${link}](/posts/${slug})`
  })

  return content
}

export interface PostMetadata {
  id: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  category: string
  readTime: string
}

export interface Post extends PostMetadata {
  content: string
}

// Returns slugs (used as page IDs / URL segments)
export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return fileNames.map(fileName => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'))
    return data.slug || fileName.replace(/\.md$/, '')
  })
}

// Returns the file path for a given slug
function getFilePathBySlug(slug: string): string {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName)
    const { data } = matter(fs.readFileSync(filePath, 'utf8'))
    if ((data.slug || fileName.replace(/\.md$/, '')) === slug) {
      return filePath
    }
  }
  throw new Error(`No post found for slug: ${slug}`)
}

export function getAllPosts(): PostMetadata[] {
  const postIds = getAllPostIds()
  const posts = postIds.map(id => getPostMetadata(id))
  
  // Sort posts by date in descending order
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMetadata(id: string): PostMetadata {
  const filePath = getFilePathBySlug(id)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const fileName = path.basename(filePath, '.md')

  const stats = readingTime(content)

  return {
    id,
    title: data.title || fileName,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    category: data.category,
    readTime: stats.text
  }
}

export async function getPostData(id: string): Promise<Post> {
  const filePath = getFilePathBySlug(id)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const fileName = path.basename(filePath, '.md')

  const filenameToSlug = buildFilenameToSlugMap()
  const convertedContent = convertObsidianLinks(content, filenameToSlug)

  const processedContent = await remark()
    .use(html)
    .process(convertedContent)
  const contentHtml = processedContent.toString()

  const stats = readingTime(content)

  return {
    id,
    title: data.title || fileName,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    category: data.category,
    readTime: stats.text,
    content: contentHtml
  }
}

export async function getLatestPost(): Promise<Post | null> {
  const postIds = getAllPostIds()
  if (postIds.length === 0) return null
  
  // Get all post metadata and sort by date
  const posts = postIds.map(id => getPostMetadata(id))
  const sortedPosts = posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  
  // Get full content for the latest post
  return await getPostData(sortedPosts[0].id)
}

export function getRecentPosts(count: number = 3, skip: number = 1): PostMetadata[] {
  const postIds = getAllPostIds()
  if (postIds.length <= skip) return []
  
  // Get all post metadata and sort by date
  const posts = postIds.map(id => getPostMetadata(id))
  const sortedPosts = posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  
  // Skip the first 'skip' posts and return 'count' posts
  return sortedPosts.slice(skip, skip + count)
}

export function getPostsByTag(tag: string): PostMetadata[] {
  const postIds = getAllPostIds()
  const posts = postIds.map(id => getPostMetadata(id))
  
  // Filter posts that contain the specified tag
  const filteredPosts = posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
  
  // Sort by date in descending order
  return filteredPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllTags(): string[] {
  const postIds = getAllPostIds()
  const posts = postIds.map(id => getPostMetadata(id))
  
  // Collect all tags from all posts
  const allTags = posts.flatMap(post => post.tags)
  
  // Return unique tags
  return [...new Set(allTags)]
}

export function getAllTagSlugs(): string[] {
  const tags = getAllTags()
  return tags.map(tag => tagToSlug(tag))
}

export function getPostsByTagSlug(slug: string): PostMetadata[] {
  const allTags = getAllTags()
  const tagName = slugToTag(slug, allTags)
  
  if (!tagName) {
    return []
  }
  
  return getPostsByTag(tagName)
}

export function getTagSlugMap(): Record<string, string> {
  const tags = getAllTags()
  return createTagSlugMap(tags)
}