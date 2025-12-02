import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostCard from '../../../../components/PostCard';
import Sidebar from '../../../../components/Sidebar';
import Link from 'next/link';
import Head from "next/head";

const POSTS_PER_PAGE = 3;

// Pagination component reused from your implementation (can refactor to a shared component file)
const Pagination = ({ numPages, currentPage, tag }) => {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center mt-10 space-x-2">
      {pages.map((page) => (
        <Link
          key={page}
          href={`/tags/${tag}/page/${page}`}
          className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${page === currentPage
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-indigo-600 hover:bg-indigo-100 dark:bg-gray-700 dark:text-indigo-300 dark:hover:bg-gray-600'
            }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};

export default function TagPostsPaginated({ posts, tag, numPages, currentPage, allTags }) {
  return (
    <>
      <Head>
        <title>{`Posts Tagged: ${tag} - Page ${currentPage} | Vishal's Blog`}</title>
        <meta
          name="description"
          content={`Explore page ${currentPage} of posts tagged ${tag} on Vishal's Blog.`}
        />
        <link
          rel="canonical"
          href={`https://vishalsblog.vercel.app/tags/${tag}/page/${currentPage}`}
        />
      </Head>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
        <Sidebar allTags={allTags} isHomepage={false} />
        <main className="flex-1 space-y-8">
          <h1 className="text-3xl font-black mb-6 text-black dark:text-white">
            Topics : <span className="text-teal-500">{tag}</span>
          </h1>
          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No posts found with the tag "{tag}".</p>
          ) : (
            posts.map((post) => <PostCard key={post.slug} {...post} />)
          )}
          {numPages > 1 && (
            <Pagination numPages={numPages} currentPage={currentPage} tag={tag} />
          )}
          <div className="mt-8">
            <Link
              href="/tags"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ← Back to All Tags
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir);
  let tags = new Set();
  let postsByTag = {};

  files.forEach((filename) => {
    const markdown = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const { data } = matter(markdown);
    if (data.tags) {
      data.tags.forEach((tag) => {
        tags.add(tag);
        if (!postsByTag[tag]) postsByTag[tag] = [];
        postsByTag[tag].push(filename);
      });
    }
  });

  // Generate paginated paths for each tag
  const paths = [];
  tags.forEach((tag) => {
    const postCount = postsByTag[tag].length;
    const numPages = Math.ceil(postCount / POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) {
      paths.push({ params: { tag, pageIndex: i.toString() } });
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { tag, pageIndex } = params;
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir);

  // Get all tags for sidebar
  let allTags = {};
  let tagPosts = [];

  files.forEach((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const { data, content } = matter(markdownWithMeta);

    // Count all tags for sidebar
    if (data.tags) {
      data.tags.forEach((tg) => {
        allTags[tg] = (allTags[tg] || 0) + 1;
      });
    }

    // Filter posts for current tag
    if (data.tags && data.tags.includes(tag)) {
      const wordCount = content.split(/\s/g).length;
      const readingTime = Math.ceil(wordCount / 200);
      tagPosts.push({
        slug: filename.replace('.md', ''),
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [],
        summary: data.summary || content.substr(0, 80) + '...',
        cover: data.cover || null,
        wordCount,
        readingTime,
      });
    }
  });

  // Sort posts by date (oldest first)
  tagPosts.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Pagination logic
  const currentPage = parseInt(pageIndex, 10);
  const numPages = Math.ceil(tagPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = tagPosts.slice(startIndex, endIndex);

  return {
    props: {
      posts: paginatedPosts,
      tag,
      numPages,
      currentPage,
      allTags,
    },
  };
}
