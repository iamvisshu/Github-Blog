import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import { Calendar, Tag, Clock, BookOpen } from "lucide-react";

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


export default function PostListPage({ posts, search = "", numPages, currentPage, allTags }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
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

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  const paths = Array.from({ length: numPages - 1 }, (_, i) => ({
    params: { page: (i + 2).toString() },
  }));

  return { paths, fallback: false };
}

function parseDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
}

export async function getStaticProps({ params }) {
  const currentPage = parseInt(params.page);
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

    // Calculate Word Count & Reading Time
    const wordCount = content.split(/\s/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      summary: frontmatter.summary || content.substr(0, 80) + "...",
      cover: frontmatter.cover || null,
      wordCount,
      readingTime
    };
  });

  // 1. Sort posts by oldest date → newest date
  posts.sort((a, b) => parseDDMMYYYY(a.date) - parseDDMMYYYY(b.date));

  // 2. Calculate pagination indices
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  // 3. Slice the posts for the current page
  const currentPagePosts = posts.slice(startIndex, endIndex);

  return {
    props: {
      posts: currentPagePosts,
      numPages,
      currentPage,
      allTags: allTags,
    },
  };
}