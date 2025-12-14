import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "../components/PostCard";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import SeriesOverview from "../components/SeriesOverview";
import { Calendar, Tag, Clock, BookOpen } from "lucide-react";
import Head from "next/head";
import { getAllSeries } from "../lib/seriesUtils";

const POSTS_PER_PAGE = 4;

import Pagination from "../components/Pagination";


export default function Home({ posts, search = "", numPages, allTags, allSeries }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Vishal's Blog - Learn and Explore Java Programming</title>
        <meta
          name="description"
          content="Explore a wide range of Java programming tutorials, examples, and guides on Vishal's Blog. Learn Java, Spring Boot, REST APIs, and more with practical insights and developer tips."
        />
        <link rel="canonical" href="https://vishalsblog.vercel.app" />
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
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
        <Sidebar allTags={allTags} isHomepage={true} />
        <main className="flex-1 space-y-8">
          {/* Series Overview Section */}
          <SeriesOverview series={allSeries} />

          {/* Posts List */}
          {filteredPosts.length === 0 && search.length > 0 ? (
            <p className="text-gray-500 dark:text-gray-200">
              No posts found for "{search}"
            </p>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.slug} {...post} />
            ))
          )}
          {numPages > 1 && <Pagination numPages={numPages} currentPage={1} />}
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const postsDir = path.join("posts");
  const files = fs.readdirSync(postsDir);
  let allTags = {};

  let posts = files.map(filename => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);

    // Count tags while mapping posts
    (frontmatter.tags || []).forEach(tag => {
      allTags[tag] = allTags[tag] ? allTags[tag] + 1 : 1;
    });

    // Calculate Word Count & Reading Time
    const wordCount = content.split(/\s/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      summary: frontmatter.summary || content.substr(0, 80) + "...",
      cover: frontmatter.cover || null,
      wordCount,
      readingTime
    };
  });

  // 1. Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 2. Calculate the total number of pages
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // 3. Slice the posts for the current page (Page 1)
  const currentPagePosts = posts.slice(0, POSTS_PER_PAGE);

  // 4. Get all series
  const allSeries = getAllSeries(
    files,
    (filename) => fs.readFileSync(path.join(postsDir, filename), "utf-8"),
    matter
  );

  return {
    props: {
      posts: currentPagePosts,
      numPages,
      allTags: allTags,
      allSeries,
    },
  };
}