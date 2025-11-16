import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";

export default function TagsPage({ tags }) {
  return (
  <>
  <Head>
    <title>Vishal's Blog - Learn and Explore Java Programming</title>
    <meta
      name="description"
      content="Explore a wide range of Java programming tutorials, examples, and guides on Vishal's Blog. Learn Java, Spring Boot, REST APIs, and more with practical insights and developer tips."
    />
    <link rel="canonical" href="https://vishalsblog.vercel.app/tags" />
    {/* Open Graph meta for link previews */}
      <meta property="og:title" content="Vishal's Blog - Learn and Explore Java Programming" />
      <meta property="og:description" content="Explore tutorials, guides, and Java programming examples on Vishal's Blog." />
      <meta property="og:image" content="https://vishalsblog.vercel.app/og-image.jpg" />
      <meta property="og:url" content="https://vishalsblog.vercel.app" />

      {/* Twitter Card for large image preview */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Vishal's Blog - Learn and Explore Java Programming" />
      <meta name="twitter:description" content="Explore tutorials, guides, and Java programming examples on Vishal's Blog." />
      <meta name="twitter:image" content="https://vishalsblog.vercel.app/og-image.jpg" />
  </Head>
    <div className="p-8">
      <h1 className="text-3xl font-black mb-4">Tags/Topics</h1>
      <div className="flex flex-wrap gap-3">
        {Object.entries(tags).map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-blue-700 dark:text-blue-200"
          >
            {tag} ({count})
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  let tags = {};
  files.forEach(filename => {
    const markdown = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data } = matter(markdown);
    (data.tags || []).forEach(tag => {
      tags[tag] = tags[tag] ? tags[tag] + 1 : 1;
    });
  });
  return { props: { tags } };
}