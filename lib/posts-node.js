const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const readingTime = require('reading-time');

const postsDirectory = path.join(process.cwd(), 'posts');

function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

function getPostMetadata(id) {
  const filePath = path.join(postsDirectory, `${id}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Calculate reading time
  const stats = readingTime(content);
  
  return {
    id,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    category: data.category || 'Blog Post',
    readTime: stats.text
  };
}

function getAllPosts() {
  const postIds = getAllPostIds();
  const posts = postIds
    .map(id => getPostMetadata(id))
    .filter(post => post !== null);
  
  // Sort posts by date in descending order
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

module.exports = {
  getAllPostIds,
  getPostMetadata,
  getAllPosts
};