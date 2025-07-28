const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Import the posts library (we'll need to adjust this for CommonJS)
const { getAllPosts } = require('../lib/posts-node.js');

async function generateOGImages() {
  console.log('🎨 Generating OG images...');
  
  // Create og-images directory if it doesn't exist
  const ogImagesDir = path.join(__dirname, '../public/og-images');
  if (!fs.existsSync(ogImagesDir)) {
    fs.mkdirSync(ogImagesDir, { recursive: true });
  }

  // Read HTML template
  const templatePath = path.join(__dirname, '../templates/og-template.html');
  const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  try {
    // Generate default OG image
    console.log('📸 Generating default OG image...');
    const defaultHtml = htmlTemplate
      .replace('{{TITLE}}', 'Hyewon Kim')
      .replace('{{DATE}}', 'Data Engineer & Software Developer')
      .replace('{{EXCERPT}}', 'Welcome to my corner of the internet where I share thoughts on data engineering, software development, and the intersection of technology and problem-solving.')
      .replace('{{CATEGORY}}', 'Blog');
    
    await page.setContent(defaultHtml, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(ogImagesDir, 'default.png'),
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 }
    });

    // Get all posts and generate OG images for each
    const posts = getAllPosts();
    console.log(`📸 Generating ${posts.length} post OG images...`);

    for (const post of posts) {
      // Format date like your blog
      const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const html = htmlTemplate
        .replace('{{TITLE}}', post.title)
        .replace('{{DATE}}', formattedDate)
        .replace('{{EXCERPT}}', post.excerpt || 'Read more about this topic...')
        .replace('{{CATEGORY}}', post.category || 'Blog Post');
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      // Create filename from post ID
      const filename = `${post.id}.png`;
      await page.screenshot({
        path: path.join(ogImagesDir, filename),
        type: 'png',
        clip: { x: 0, y: 0, width: 1200, height: 630 }
      });
      
      console.log(`  ✅ Generated: ${filename}`);
    }

  } catch (error) {
    console.error('❌ Error generating OG images:', error);
  } finally {
    await browser.close();
  }

  console.log('🎉 OG image generation complete!');
}

// Run if called directly
if (require.main === module) {
  generateOGImages().catch(console.error);
}

module.exports = { generateOGImages };