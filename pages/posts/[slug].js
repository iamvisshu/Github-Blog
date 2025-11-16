import matter from "gray-matter";
import Link from "next/link";
// Ensure ALL Lucide icons are imported from lucide-react (the correct package)
import {
    Calendar,
    Tag,
    User,
    Clock,
    BookOpen,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import Head from "next/head";

// NOTE: These imports are left at the top for the main component rendering.
// Dynamic imports are used inside getStaticProps for build compatibility.

// Helper component for Next/Previous Navigation
const PostNavigation = ({ prevPost, nextPost }) => {
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
      {/* Previous Post Link */}
      {prevPost ? (
        <Link
          href={`/posts/${prevPost.slug}`}
          className="flex flex-col p-4 rounded-xl transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 group w-full mr-4 border border-gray-200 dark:border-gray-700"
        >
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform" />
            Previous Post
          </span>
          <span className="font-bold text-black dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 mt-1 line-clamp-2">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        // Use hidden on mobile and visibility on desktop to maintain layout without taking space
        <div className="hidden sm:block w-full mr-4"></div>
      )}

      {/* Next Post Link */}
      {nextPost ? (
        <Link
          href={`/posts/${nextPost.slug}`}
          className="flex flex-col p-4 rounded-xl transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 group w-full ml-4 text-right border border-gray-200 dark:border-gray-700"
        >
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center justify-end gap-1">
            Next Post
            <ChevronRight className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform" />
          </span>
          <span className="font-bold text-black dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 mt-1 line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        // Use hidden on mobile and visibility on desktop to maintain layout without taking space
        <div className="hidden sm:block w-full ml-4"></div>
      )}
    </div>
  );
};


export default function PostPage({ frontmatter, contentHtml, wordCount, readingTime, prevPost, nextPost }) {
  // Destructure frontmatter
  const { title, summary, slug, date, tags, author = "Vishal Vishwakarma" } = frontmatter;

  return (
  <>
    <Head>
      <title>{title} | Vishal's Blog</title>
      <meta name="description" content={ summary || "Read this article on Vishal's Blog - Vishal Vishwakarma's blog." } />
      <link rel="canonical" href={`https://vishalsblog.vercel.app/posts/${slug || ""}`} />
      {/* Open Graph meta for link previews */}
      <meta property="og:title" content="Vishal's Blog - Learn and Explore Java Programming" />
      <meta property="og:description" content="Explore tutorials, guides, and Java programming examples on Vishal's Blog." />
      <meta property="og:image" content="https://vishalsblog.vercel.app/images/og-image.jpg" />
      <meta property="og:url" content="https://vishalsblog.vercel.app" />
      <meta property="og:type" content="website" />

      {/* Twitter Card for large image preview */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vishal's Blog - Learn and Explore Java Programming" />
      <meta name="twitter:description" content="Explore tutorials, guides, and Java programming examples on Vishal's Blog." />
      <meta name="twitter:image" content="https://vishalsblog.vercel.app/images/og-image.jpg" />
      <meta property="twitter:domain" content="vishalsblog.vercel.app" />
      <meta property="twitter:url" content="https://vishalsblog.vercel.app/" />
    </Head>
    <div className="p-2 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">

      <article className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-4 md:p-8">
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

            <span className="text-gray-400 dark:text-gray-600">|</span>

            {/* Reading Time */}
            <span className="flex items-center gap-1 text-black dark:text-white">
                <Clock className="w-4 h-4 text-teal-500" />
                {readingTime} min read
            </span>

            <span className="text-gray-400 dark:text-gray-600">|</span>

            {/* Word Count */}
            <span className="flex items-center gap-1 text-black dark:text-white">
                <BookOpen className="w-4 h-4 text-teal-500" />
                {wordCount.toLocaleString()} words
            </span>

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

        {/* Next/Previous Navigation */}
        <PostNavigation prevPost={prevPost} nextPost={nextPost} />

      </article>
    </div>
    </>
  );
}

export async function getStaticPaths() {
    // ... (unchanged)
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

    // --- 1. Read Current Post Content ---
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

    // --- 2. Calculate Word Count & Reading Time ---
    const wordCount = content.split(/\s/g).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 Words Per Minute standard

    // --- 3. Determine Next/Previous Posts ---
    const files = fs.readdirSync(path.join("posts"));

    // a. Get data for ALL posts to sort them
    let allPosts = files.map(filename => {
        const fileSlug = filename.replace(".md", "");
        const fileContent = fs.readFileSync(path.join("posts", filename), "utf-8");
        const { data: fileFrontmatter } = matter(fileContent);

        return {
            slug: fileSlug,
            title: fileFrontmatter.title,
            // Use an empty string if date is missing
            date: fileFrontmatter.date || ''
        };
    });

    // b. Sort all posts by date (newest first is typical blog order)
    allPosts.sort((a, b) => {
        // Safely convert dates to timestamp for reliable comparison
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        return dateB - dateA; // Newest first
    });

    // c. Find the index of the current post
    const currentIndex = allPosts.findIndex(post => post.slug === slug);

    // d. Determine next and previous posts based on the sorted array
    // Next is older post (index + 1 in newest-first sort)
    // Previous is newer post (index - 1 in newest-first sort)
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;


    return {
        props: {
            frontmatter,
            contentHtml,
            wordCount,
            readingTime,
            prevPost,
            nextPost
        }
    };
}