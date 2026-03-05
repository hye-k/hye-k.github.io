const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const readingTime = require('reading-time');

const contentDir = path.join(process.cwd(), 'content', 'published');
const postsDirectory = fs.existsSync(contentDir) ? contentDir : path.join(process.cwd(), 'posts');

function getFilePathBySlug(slug) {
  if (!fs.existsSync(postsDirectory)) return null;
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    if ((data.slug || fileName.replace(/\.md$/, '')) === slug) {
      return filePath;
    }
  }
  return null;
}

function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
  return fileNames.map(fileName => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'));
    return data.slug || fileName.replace(/\.md$/, '');
  });
}

function getPostMetadata(id) {
  const filePath = getFilePathBySlug(id);

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const fileName = path.basename(filePath, '.md');

  const stats = readingTime(content);

  return {
    id,
    title: data.title || fileName,
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