import matter from "gray-matter";
import Link from "next/link";
import { Calendar, Tag, User } from "lucide-react";

// NOTE: These imports are left at the top for the main component rendering.
// Dynamic imports are used inside getStaticProps for build compatibility.

export default function PostPage({ frontmatter, contentHtml }) {
  // Destructure frontmatter, using "Vishal Vishwakarma" as the default author
  const { title, date, tags, author = "Vishal Vishwakarma" } = frontmatter;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">

      <aside className="hidden md:block w-full md:w-auto">{/* Sidebar */}</aside>

      <article className="flex-1 w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
        <h1 className="text-3xl font-black mb-4 text-black dark:text-white">{title}</h1>

        {/* Metadata Section with Icons and Links */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6 border-b pb-4">

            {/* Date with Calendar Icon */}
            <span className="flex items-center gap-1 text-black dark:text-white">
                <Calendar className="w-4 h-4 text-teal-500" />
                {date}
            </span>

            <span className="text-gray-400 dark:text-gray-600">|</span>

            {/* Author Name wrapped in Link to /about */}
            <Link
                href="/about"
                className="flex items-center gap-1 text-black dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
            >
                <User className="w-4 h-4 text-teal-500" />
                {author}
            </Link>

            {/* Tags with Tag Icon (Only show if tags exist) */}
            {tags && tags.length > 0 && (
                <>
                    <span className="text-gray-400 dark:text-gray-600">|</span>
                    <span className="flex items-center gap-1 text-black dark:text-white">
                        <Tag className="w-4 h-4 text-teal-500" />
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <Link
                                key={tag}
                                href={`/tags/${tag}`}
                                className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </>
            )}
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
    // Standard Node/CJS modules can use require
    const fs = require("fs");
    const path = require("path");
    const matter = require("gray-matter");

    // Dynamic imports for modern ESM modules (required for Next.js build)
    const { remark } = await import("remark");
    const { default: remarkHtml } = await import("remark-html");
    const { default: remarkGfm } = await import("remark-gfm");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", `${slug}.md`),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(markdownWithMeta);

    const processedContent = await remark()
      .use(remarkHtml)
      .use(remarkGfm)
      .process(content);

    const contentHtml = processedContent.toString();

    return { props: { frontmatter, contentHtml } };
}