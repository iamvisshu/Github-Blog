import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function TagPosts({ posts, tag }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-4">Posts tagged "{tag}"</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/tags" className="text-blue-500">Back to all tags</Link>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  let tags = new Set();
  files.forEach(filename => {
    const markdown = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data } = matter(markdown);
    (data.tags || []).forEach(tag => tags.add(tag));
  });
  return {
    paths: Array.from(tags).map(tag => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { tag } }) {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map(filename => {
    const slug = filename.replace(".md", "");
    const markdown = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data } = matter(markdown);
    return { slug, ...data };
  }).filter(post => post.tags && post.tags.includes(tag));
  return { props: { posts, tag } };
}
