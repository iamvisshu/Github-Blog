import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

// Define the number of posts per page (MUST match index.js)
const POSTS_PER_PAGE = 3;

// Pagination Component (copied from index.js)
const Pagination = ({ numPages, currentPage }) => {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10 space-x-2">
      {pages.map(page => (
        <Link
          key={page}
          // Link to / if it's the first page, otherwise link to /page/[page]
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


export default function Page({ posts, search = "", numPages, currentPage }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
        {/* Sidebar (Copied from index.js) */}
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

          {/* Social links */}
          <div className="flex gap-4 mb-8">
            <a href="https://www.linkedin.com/in/iamvisshu" className="bg-teal-200 p-2 rounded-full"><span role="img">🐦</span></a>
            <a href="https://iamvisshu.github.io" className="bg-green-200 p-2 rounded-full"><span role="img">💻</span></a>
            <a href="https://github.com/iamvisshu" className="bg-blue-200 p-2 rounded-full"><span role="img">🌐</span></a>
          </div>

          {/* Categories */}
          <div className="w-full">
            <h4 className="font-bold mb-2 dark:text-white">Categories</h4>
            <ul>
              <li className="mb-1 flex justify-between">
                <span className="dark:text-gray-200">Examples</span>
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2">4</span>
              </li>
              <li className="mb-1 flex justify-between">
                <span className="dark:text-gray-200">Guides</span>
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2">1</span>
              </li>
              <li className="mb-1 flex justify-between">
                <span className="dark:text-gray-200">Java</span>
                <span className="bg-gray-100 dark:bg-gray-700 rounded px-2">3</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-8">
          {filteredPosts.length === 0 && search.length > 0 ? (
            <p className="text-gray-500 dark:text-gray-200">
              No posts found for "{search}"
            </p>
          ) : (
            filteredPosts.map(({ slug, title, date, summary, tags, cover }) => (
              <div
                key={slug}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-6 flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-start w-full break-words"
              >
                {/* Post rendering logic (same as before) */}
                {/* Post cover image */}
                {cover && (
                  <Image
                    src={cover}
                    alt={title}
                    width={150}
                    height={110}
                    className="rounded-xl flex-shrink-0"
                  />
                )}

                {/* Post content */}
                <div className="flex-1 min-w-0">
                  <Link href={`/posts/${slug}`}>
                    <h2 className="text-2xl font-black mb-2 cursor-pointer hover:text-teal-500 dark:hover:text-teal-400 text-black dark:text-white break-words">
                      {title}
                    </h2>
                  </Link>

                  {/* Post meta (date + tags) */}
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-2">
                    <span>{date}</span>
                    {tags?.map(tag => (
                      <span
                        key={tag}
                        className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 cursor-pointer break-words"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-gray-700 dark:text-gray-200 break-words w-full">
                    {summary || "Post summary goes here."}
                  </p>
                </div>

                {/* Arrow link */}
                <div className="self-end sm:self-center">
                  <Link href={`/posts/${slug}`}>
                    <span className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900 text-xl font-bold text-indigo-700 dark:text-indigo-200 cursor-pointer">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            ))
          )}

          {/* Pagination component: render for all pages > 1 */}
          {numPages > 1 && <Pagination numPages={numPages} currentPage={currentPage} />}
        </main>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  // Generate paths for all pages except page 1 (which is '/')
  const paths = Array.from({ length: numPages - 1 }, (_, i) => ({
    params: { page: (i + 2).toString() }, // Start from page 2
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page);

  const files = fs.readdirSync(path.join("posts"));
  let posts = files.map(filename => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);
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

  // 3. Calculate start and end index for the current page
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  // 4. Slice the posts for the current page
  const postsToShow = posts.slice(startIndex, endIndex);

  return { props: { posts: postsToShow, numPages, currentPage: page } };
}