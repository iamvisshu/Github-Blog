import fs from "fs";
import path from "path";
import matter from "gray-matter";
// Removed: Image, Link, and Lucide icons as they are now in Sidebar.js
import PostCard from "../components/PostCard";
import Link from "next/link";
// NEW: Import the Sidebar component
import Sidebar from "../components/Sidebar";

// NOTE: Adjusted to POSTS_PER_PAGE=4 based on the latest context from [page].js
const POSTS_PER_PAGE = 4;

const Pagination = ({ numPages, currentPage }) => {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center mt-10 space-x-2">
      {pages.map(page => (
        <Link
          key={page}
          href={page === 1 ? "/" : `/page/${page}`}
          className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600 hover:bg-indigo-100 dark:bg-gray-700 dark:text-indigo-300 dark:hover:bg-gray-600"
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};


export default function Home({ posts, search = "", numPages, allTags }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
        {/* MODIFIED: Use reusable Sidebar component and pass isHomepage={true} */}
        <Sidebar allTags={allTags} isHomepage={true} />

        {/* Main content */}
        <main className="flex-1 space-y-8">
          {/* Post Card Rendering */}
          {filteredPosts.length === 0 && search.length > 0 ? (
            <p className="text-gray-500 dark:text-gray-200">
              No posts found for "{search}"
            </p>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.slug} {...post} />
            ))
          )}

          {/* Pagination component */}
          {numPages > 1 && <Pagination numPages={numPages} currentPage={1} />}
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  let allTags = {};

  let posts = files.map(filename => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);

    // Count tags while mapping posts
    (frontmatter.tags || []).forEach(tag => {
      allTags[tag] = allTags[tag] ? allTags[tag] + 1 : 1;
    });

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      summary: frontmatter.summary || content.substr(0, 80) + "...",
      cover: frontmatter.cover || null,
    };
  });

  // 1. Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 2. Calculate the total number of pages
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // 3. Slice the posts to only show the first page's posts
  const postsToShow = posts.slice(0, POSTS_PER_PAGE);

  return { props: { posts: postsToShow, numPages, allTags } };
}