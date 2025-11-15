import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "../../components/PostCard"; // ADDED: Import the reusable component
import Link from "next/link"; // Needed for 'Back to all tags' link

export default function TagPostList({ posts, tag }) {
  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-black mb-6 text-black dark:text-white">
        Posts Tagged: <span className="text-teal-500">{tag}</span>
      </h1>

      <div className="space-y-8">
        {posts.map(post => (
          // Use the imported PostCard component
          <PostCard key={post.slug} {...post} />
        ))}
      </div>

      {posts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-300">No posts found with the tag "{tag}".</p>
      )}

      {/* Added link to return to the /tags page */}
      <div className="mt-8">
        <Link href="/tags" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            ← Back to All Tags
        </Link>
      </div>
    </div>
  );
}

// getStaticPaths and getStaticProps logic remains the same as before,
// ensuring all posts are read and filtered correctly.

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  let tags = new Set();

  files.forEach(filename => {
    const markdown = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data } = matter(markdown);
    (data.tags || []).forEach(tag => tags.add(tag));
  });

  const paths = Array.from(tags).map(tag => ({
    params: { tag: tag }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tag = params.tag;
  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  // Use Promise.all with async map to await inside
  const allPosts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");

      const markdownWithMeta = fs.readFileSync(
        path.join(postsDirectory, filename),
        "utf-8"
      );

      // Dynamic import inside async callback is allowed now
      const { remark } = await import("remark");
      const { default: remarkHtml } = await import("remark-html");
      const { default: remarkGfm } = await import("remark-gfm");
      const { data, content } = matter(markdownWithMeta);

      const processedContent = await remark()
        .use(remarkHtml)
        .use(remarkGfm)
        .process(content);
      const contentHtml = processedContent.toString();

      const wordCount = content.split(/\s/g).length;
      const readingTime = Math.ceil(wordCount / 200); // 200 Words Per Minute standard

      return {
        slug,
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        summary: data.summary || content.substr(0, 80) + "...",
        cover: data.cover || null,
        wordCount,
        readingTime,
      };
    })
  );

  const filteredPosts = allPosts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date (oldest first)

  return {
    props: {
      posts: filteredPosts,
      tag,
    },
  };
}