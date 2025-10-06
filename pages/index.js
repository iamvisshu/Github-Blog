import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import PostCard from "../components/PostCard";
import Link from "next/link";
import { Linkedin, Github, Globe, Twitter, BadgeCheck } from "lucide-react";

const POSTS_PER_PAGE = 3;

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
        {/* Sidebar */}
        <aside className="w-full md:w-80 flex flex-col space-y-6">

          {/* SECTION 1: Bio and Social Links (MODIFIED: Added divider and text contrast) */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <Image
              src="/images/avatar.jpg"
              width={120}
              height={120}
              alt="Profile"
              className="rounded-xl object-cover mb-4 shadow-lg"
            />

            <div className="flex items-center gap-1 mb-3">
                <p className="font-bold text-xl text-black dark:text-white">iamvisshu</p>
                <BadgeCheck
                    className="w-5 h-5 text-white fill-blue-500 dark:fill-blue-400"
                    strokeWidth={2.5}
                />
            </div>
            {/* Bio Text with improved color/contrast */}
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Vishal Vishwakarma, is a Senior Software Developer with a comprehensive professional IT experience of over five years in software development and coding.
            </p>

            {/* Visual Divider */}
            <hr className="w-full border-t border-gray-200 dark:border-gray-700 mb-4" />

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/iamvisshu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-200 p-2 rounded-full text-teal-700 dark:bg-teal-900 dark:text-teal-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/iamvisshu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-200 p-2 rounded-full text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://iamvisshu.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-200 p-2 rounded-full text-green-700 dark:bg-green-900 dark:text-green-200"
              >
                <Globe className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/iamvisshu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-200 p-2 rounded-full text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* SECTION 2: Dynamic Tags */}
          <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h4 className="font-bold mb-4 dark:text-white">Tags</h4>
            {/* New flex layout for the pills */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(allTags).sort(([tagA, countA], [tagB, countB]) => countB - countA).map(([tag, count]) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 transition-colors
                             hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500"
                >
                  {tag} ({count})
                </Link>
              ))}
            </div>
          </div>
        </aside>

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