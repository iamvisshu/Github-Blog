import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import PostCard from "../components/PostCard"; // Use the shared PostCard
import Link from "next/link";

// Define the number of posts per page
const POSTS_PER_PAGE = 3;

// Pagination Component (retained - no changes needed)
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


// CHANGE: Receive the 'allTags' prop from getStaticProps
export default function Home({ posts, search = "", numPages, allTags }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <Image
            src="/images/avatar.jpg"
            width={120}
            height={120}
            alt="Profile"
            className="rounded-xl object-cover mb-4"
          />
          <p className="font-black text-xl mb-2 dark:text-white">iamvisshu</p>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-4">
            Vishal Vishwakarma, is a Senior Software Developer with a comprehensive professional IT experience of over five years in software development and coding.
          </p>

          {/* Social links (Unchanged) */}
          <div className="flex gap-4 mb-8">
            <a href="https://www.linkedin.com/in/iamvisshu" className="bg-teal-200 p-2 rounded-full"><span role="img">🐦</span></a>
            <a href="https://iamvisshu.github.io" className="bg-green-200 p-2 rounded-full"><span role="img">💻</span></a>
            <a href="https://github.com/iamvisshu" className="bg-blue-200 p-2 rounded-full"><span role="img">🌐</span></a>
          </div>

          {/* CHANGE: Categories replaced with Dynamic Tags */}
          <div className="w-full">
            <h4 className="font-bold mb-2 dark:text-white">Tags</h4>
            <ul className="space-y-2">
              {/* Map over the sorted tags */}
              {Object.entries(allTags).sort(([tagA, countA], [tagB, countB]) => countB - countA).map(([tag, count]) => (
                <li key={tag} className="flex justify-between items-center">
                  <Link
                    href={`/tags/${tag}`}
                    className="dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {tag}
                  </Link>
                  <span className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-0.5 text-sm">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-8">
          {/* Post Card Rendering (Unchanged) */}
          {filteredPosts.length === 0 && search.length > 0 ? (
            <p className="text-gray-500 dark:text-gray-200">
              No posts found for "{search}"
            </p>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.slug} {...post} />
            ))
          )}

          {/* Pagination component: Only render if there's more than one page */}
          {numPages > 1 && <Pagination numPages={numPages} currentPage={1} />}
        </main>
      </div>
    </>
  );
}

// CHANGE: Updated getStaticProps to collect tags and pass them as a prop
export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  let allTags = {}; // NEW: Object to store tags and their counts

  let posts = files.map(filename => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);

    // NEW: Count tags while mapping posts
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

  // CHANGE: Return allTags alongside posts and numPages
  return { props: { posts: postsToShow, numPages, allTags } };
}