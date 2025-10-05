const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define the root directory for your posts
const POSTS_DIR = path.join(process.cwd(), 'posts');

export default async function handler(req, res) {
  try {
    const files = fs.readdirSync(POSTS_DIR);

    const posts = files.map(filename => {
      const slug = filename.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
      const { data: frontmatter, content } = matter(markdownWithMeta);

      // Create a search document with relevant fields
      return {
        slug,
        title: frontmatter.title || '',
        date: frontmatter.date || '',
        tags: frontmatter.tags || [],
        // Combine summary and content's first part for better search hits
        snippet: frontmatter.summary || content.substring(0, 100) + '...',
        searchableText: (
          frontmatter.title +
          ' ' +
          (frontmatter.tags || []).join(' ') +
          ' ' +
          (frontmatter.summary || '')
        ).toLowerCase(),
      };
    });

    // Send the JSON index to the client
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error reading posts for search index:', error);
    res.status(500).json({ error: 'Failed to generate search index.' });
  }
}