import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
// ADDED: Import the reusable PostCard component
import PostCard from "../../components/PostCard";
// NEW: Import the Sidebar component
import Sidebar from "../../components/Sidebar";

// NOTE: Ensure this value matches the one in pages/index.js!
const POSTS_PER_PAGE = 4;

// Pagination Component (retained)
const Pagination = ({ numPages, currentPage }) => {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10 space-x-2">
      {pages.map(page => (
        <Link
          key={page}
          // Link back to the root path for page 1
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


export default function PostListPage({ posts, search = "", numPages, currentPage, allTags }) { // MODIFIED: Receive allTags prop
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">

        {/* MODIFIED: Render the full Sidebar component and pass isHomepage={false} */}
        <Sidebar allTags={allTags} isHomepage={false} />

        <main className="flex-1 space-y-8">
          {filteredPosts.length === 0 && search.length > 0 ? (
            <p className="text-gray-500 dark:text-gray-200">
              No posts found for "{search}"
            </p>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.slug} {...post} />
            ))
          )}

          {numPages > 1 && <Pagination numPages={numPages} currentPage={currentPage} />}
        </main>
      </div>
    </>
  );
}

// Get paths for all pagination pages
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  // Generate paths for all pages starting from page 2
  const paths = Array.from({ length: numPages - 1 }, (_, i) => ({
    params: { page: (i + 2).toString() }, // i+2 generates '2', '3', '4', etc.
  }));

  return { paths, fallback: false };
}

// Get posts for the current page number
export async function getStaticProps({ params }) {
  const currentPage = parseInt(params.page);
  const files = fs.readdirSync(path.join("posts"));
  let allTags = {}; // NEW: Initialize and collect allTags

  let posts = files.map(filename => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);

    // NEW: Count tags while mapping posts (copied from index.js)
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

  // 2. Calculate pagination indices
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  // 3. Slice posts for the current page
  const postsToShow = posts.slice(startIndex, endIndex);


  return {
    props: {
      posts: postsToShow,
      numPages,
      currentPage,
      allTags // NEW: Pass allTags data to the component
    }
  };
}