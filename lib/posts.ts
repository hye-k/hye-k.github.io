import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'posts')

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

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

export function getAllPosts(): PostMetadata[] {
  const postIds = getAllPostIds()
  const posts = postIds.map(id => getPostMetadata(id))
  
  // Sort posts by date in descending order
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMetadata(id: string): PostMetadata {
  const filePath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Calculate reading time
  const stats = readingTime(content)
  
  return {
    id,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    category: data.category,
    readTime: stats.text
  }
}

export async function getPostData(id: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()
  
  // Calculate reading time
  const stats = readingTime(content)
  
  return {
    id,
    title: data.title,
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