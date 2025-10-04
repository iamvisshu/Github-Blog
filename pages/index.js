import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

export default function Home({ posts, search = "" }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <aside className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center">
          <Image src="/images/avatar.jpg" width={120} height={120} alt="Profile" className="rounded-xl object-cover mb-4" />
          <p className="font-black text-xl mb-2 dark:text-white">iamvisshu</p>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-4">
            Vishal Vishwakarma, is a Senior Software Developer with a comprehensive professional IT experience of over five years in software development and coding.
          </p>
          <div className="flex gap-4 mb-8">
            <a href="https://www.linkedin.com/in/iamvisshu" className="bg-teal-200 p-2 rounded-full"><span role="img">🐦</span></a>
            <a href="https://iamvisshu.github.io" className="bg-green-200 p-2 rounded-full"><span role="img">💻</span></a>
            <a href="https://github.com/iamvisshu" className="bg-blue-200 p-2 rounded-full"><span role="img">🌐</span></a>
          </div>
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
        <main className="flex-1 space-y-8">
          {filteredPosts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-200">
              No posts found for "{search}"
            </p>
          ) : (
            filteredPosts.map(({ slug, title, date, summary, tags, cover }) => (
              <div key={slug} className="bg-white dark:bg-gray-800 rounded-2xl shadow flex p-6 gap-6 items-center">
                {cover && (
                  <Image src={cover} alt={title} width={150} height={110} className="rounded-xl" />
                )}
                <div className="flex-1">
                  <Link href={`/posts/${slug}`}>
                    <h2 className="text-2xl font-black mb-2 cursor-pointer hover:text-teal-500 dark:hover:text-teal-400 text-black dark:text-white">
                      {title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-300 mb-2">
                    <span>{date}</span>
                    {tags?.map(tag => (
                      <span key={tag} className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{summary || "Post summary goes here."}</p>
                </div>
                <div>
                  <Link href={`/posts/${slug}`}>
                    <span className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900 text-xl font-bold text-indigo-700 dark:text-indigo-200 cursor-pointer">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
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
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { props: { posts } };
}
