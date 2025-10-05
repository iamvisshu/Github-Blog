import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm"; // ADDED: For tables
import Link from "next/link"; // ADDED: For clickable tags

export default function PostPage({ frontmatter, contentHtml }) {
  const { title, date, tags } = frontmatter; // Destructure tags

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">

      <aside className="hidden md:block w-full md:w-auto">{/* Sidebar as on homepage */}</aside>

      <article className="flex-1 w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
        <h1 className="text-3xl font-black mb-4 text-black dark:text-white">{title}</h1>

        {/* ADDED: Display Date and Clickable Tags */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-300 mb-6 border-b pb-4">
            <span className="font-semibold text-black dark:text-white">Published: {date}</span>
            <span className="text-gray-400 dark:text-gray-600">|</span>

            {/* Map over tags and render Link components */}
            {tags && tags.map(tag => (
                <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                >
                    {tag}
                </Link>
            ))}
        </div>

        {/* Post Content */}
        <div
          className="prose dark:prose-invert max-w-none overflow-hidden"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const fs = require("fs");
  const path = require("path");

  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map(filename => ({
    params: { slug: filename.replace(".md", "") }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const fs = require("fs");
  const path = require("path");

  const markdownWithMeta = fs.readFileSync(
    path.join("posts", `${slug}.md`),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  // CHANGE: Added .use(remarkGfm) to the remark processing chain
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(content);

  const contentHtml = processedContent.toString();

  return { props: { frontmatter, contentHtml } };
}