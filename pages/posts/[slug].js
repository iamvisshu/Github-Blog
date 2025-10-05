import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm"; // <-- ADDED: Import GFM plugin

export default function PostPage({ frontmatter, contentHtml }) {
  return (
    // Updated container from previous issue fix
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">

      <aside className="hidden md:block w-full md:w-auto">{/* Sidebar as on homepage */}</aside>

      <article className="flex-1 w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
        <h1 className="text-3xl font-black mb-4 text-black dark:text-white">{frontmatter.title}</h1>
        {/* Dates/tags/cover here, then content */}
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
    .use(remarkGfm) // <-- ADDED: Process tables and other GFM features
    .process(content);

  const contentHtml = processedContent.toString();

  return { props: { frontmatter, contentHtml } };
}