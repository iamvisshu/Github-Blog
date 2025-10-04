import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function TagsPage({ tags }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-4">Tags</h1>
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