// pages/posts/[slug].js
import matter from "gray-matter";
import Link from "next/link";
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
import SeriesBox from "../../components/SeriesBox";
import NextSeriesCard from "../../components/NextSeriesCard";

const PostNavigation = ({ prevPost, nextPost }) => {
  // Single row on mobile: use flex-row and allow wrapping if very narrow.
  // Reduce padding and font-size for mobile with responsive classes.
  return (
    <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-row flex-wrap gap-3">
        {/* Previous Post */}
        {prevPost ? (
          <Link
            href={`/posts/${prevPost.slug}`}
            className="flex items-center gap-3 justify-start p-3 md:p-4 rounded-xl transition-all duration-200 hover:bg-teal-50 dark:hover:bg-teal-900/50 border border-gray-200 dark:border-gray-700 flex-1 min-w-0"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 shrink-0">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Previous Post</div>
              <div className="font-bold text-sm md:text-base text-black dark:text-white truncate">
                {prevPost.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block flex-1" />
        )}

        {/* Next Post */}
        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slug}`}
            className="flex items-center gap-3 justify-end p-3 md:p-4 rounded-xl transition-all duration-200 hover:bg-teal-50 dark:hover:bg-teal-900/50 border border-gray-200 dark:border-gray-700 flex-1 min-w-0"
          >
            <div className="text-right min-w-0 mr-2">
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Next Post</div>
              <div className="font-bold text-sm md:text-base text-black dark:text-white truncate">
                {nextPost.title}
              </div>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div className="hidden md:block flex-1" />
        )}
      </div>
    </div>
  );
};

export default function PostPage({
  slug,
  frontmatter,
  contentHtml,
  wordCount,
  readingTime,
  prevPost,
  nextPost,
  seriesPosts = [],
  seriesTitle = null,
  nextSeries = null
}) {
  // Safe title/summary
  const rawTitle = frontmatter?.title ?? "";
  const safeTitle = Array.isArray(rawTitle)
    ? rawTitle.join(" ")
    : (typeof rawTitle === "string" ? rawTitle : String(rawTitle));

  const rawSummary = frontmatter?.summary ?? "";
  const safeSummary = Array.isArray(rawSummary)
    ? rawSummary.join(" ")
    : (typeof rawSummary === "string" ? rawSummary : String(rawSummary));

  const pageTitle = `${safeTitle} | Vishal's Blog`;
  const canonicalUrl = `https://vishalsblog.vercel.app/posts/${encodeURIComponent(slug || "")}`;

  const {
    title,
    date,
    tags,
    author = "Vishal Vishwakarma"
  } = frontmatter || {};

  const currentSlug = slug;

  /**
   * SERIES props conversion:
   * - seriesPosts (from getStaticProps) contains items like: { slug, title, part }
   * - For SeriesBox we want items: [{ slug, title }], computed part (numeric), total
   */
  const itemsForSeries = Array.isArray(seriesPosts)
    ? seriesPosts.map(sp => ({ slug: sp.slug, title: sp.title || sp.slug }))
    : [];

  const currentIndexInSeries = itemsForSeries.findIndex(p => p.slug === currentSlug);

  // If seriesPosts included part numbers in getStaticProps, prefer that; otherwise infer from index + 1.
  const inferredPart = (currentIndexInSeries !== -1)
    ? (seriesPosts[currentIndexInSeries]?.part ?? (currentIndexInSeries + 1))
    : null;

  const seriesTotal = Array.isArray(itemsForSeries) ? itemsForSeries.length : 0;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={safeSummary} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={safeSummary} />
        <meta property="og:image" content="https://vishalsblog.vercel.app/images/og-image.jpg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={safeSummary} />
        <meta name="twitter:image" content="https://vishalsblog.vercel.app/images/og-image.jpg" />
      </Head>

      <div className="p-2 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <article className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-4 md:p-8">
          <h1 className="text-3xl font-black mb-4 text-black dark:text-white">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6 border-b pb-4">
            <span className="flex items-center gap-1 text-black dark:text-white">
              <Calendar className="w-4 h-4 text-teal-500" />
              {date}
            </span>

            <span className="text-gray-400 dark:text-gray-600">|</span>

            <Link
              href="/about"
              className="flex items-center gap-1 text-black dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <User className="w-4 h-4 text-teal-500" />
              {author}
            </Link>

            <span className="text-gray-400 dark:text-gray-600">|</span>

            <span className="flex items-center gap-1 text-black dark:text-white">
              <Clock className="w-4 h-4 text-teal-500" />
              {readingTime} min read
            </span>

            <span className="text-gray-400 dark:text-gray-600">|</span>

            <span className="flex items-center gap-1 text-black dark:text-white">
              <BookOpen className="w-4 h-4 text-teal-500" />
              {wordCount.toLocaleString()} words
            </span>

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
                      className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-700"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Series box: pass normalized props expected by the SeriesBox component */}
          {seriesTitle && itemsForSeries.length > 0 && (
            <SeriesBox
              title={seriesTitle}
              part={inferredPart}
              total={seriesTotal}
              items={itemsForSeries}
              currentSlug={currentSlug}
            />
          )}

          {/* Content */}
          <div
            className="prose dark:prose-invert max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Navigation (we purposely pass prev/next computed in getStaticProps) */}
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />

          {/* Next Series Card (show only on last post of a series) */}
          {nextSeries && (
            <NextSeriesCard
              currentSeriesTitle={seriesTitle}
              nextSeries={nextSeries}
            />
          )}
        </article>
      </div>
    </>
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
  const matter = require("gray-matter");

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

  const wordCount = content.split(/\s/g).length;
  const readingTime = Math.ceil(wordCount / 200);

  const files = fs.readdirSync(path.join("posts"));

  // Build site-wide posts array (used as fallback ordering)
  let allPosts = files.map(filename => {
    const fileSlug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: fm } = matter(fileContent);

    return {
      slug: fileSlug,
      title: fm.title,
      date: fm.date || ""
    };
  });

  // sort by date (newest first)
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // --- SERIES MAP (group by series name) ---
  const seriesMap = {};
  files.forEach(filename => {
    const fileSlug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data: fm } = matter(fileContent);

    if (fm && fm.series) {
      if (!seriesMap[fm.series]) seriesMap[fm.series] = [];
      seriesMap[fm.series].push({
        slug: fileSlug,
        title: fm.title || fileSlug,
        part: fm.part !== undefined ? Number(fm.part) : null
      });
    }
  });

  // sort each series by part (nulls last) and fallback deterministically by slug
  Object.keys(seriesMap).forEach(k => {
    seriesMap[k].sort((a, b) => {
      const pa = a.part === null ? Number.MAX_SAFE_INTEGER : a.part;
      const pb = b.part === null ? Number.MAX_SAFE_INTEGER : b.part;
      if (pa !== pb) return pa - pb;
      return a.slug.localeCompare(b.slug);
    });
  });

  // Determine prev/next using series order when the current post is part of a series
  const currentSeriesTitle = frontmatter.series || null;
  const seriesPosts = currentSeriesTitle ? (seriesMap[currentSeriesTitle] || []) : [];

  let prevPost = null;
  let nextPost = null;

  if (seriesPosts.length > 0) {
    // find current index in series (deterministic sorted order)
    const idx = seriesPosts.findIndex(p => p.slug === slug);
    if (idx !== -1) {
      if (idx > 0) prevPost = { slug: seriesPosts[idx - 1].slug, title: seriesPosts[idx - 1].title };
      if (idx < seriesPosts.length - 1) nextPost = { slug: seriesPosts[idx + 1].slug, title: seriesPosts[idx + 1].title };
    }
    // IMPORTANT: do NOT fall back to date-based neighbors when the post is part of a series.
    // This ensures first/last items in a series do not show unrelated global prev/next.
  }

  // Fallback: only use site-wide date order if the post is NOT part of a series
  // (or if it claims a series but is not actually found inside that series).
  const currentInSeries = seriesPosts.length > 0 && seriesPosts.findIndex(p => p.slug === slug) !== -1;
  if (!currentInSeries) {
    const currentIndex = allPosts.findIndex(post => post.slug === slug);
    const prevByDate = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null; // older
    const nextByDate = currentIndex > 0 ? allPosts[currentIndex - 1] : null; // newer
    if (!prevPost && prevByDate) prevPost = { slug: prevByDate.slug, title: prevByDate.title };
    if (!nextPost && nextByDate) nextPost = { slug: nextByDate.slug, title: nextByDate.title };
  }

  // --- DETECT LAST POST AND NEXT SERIES ---
  const { getAllSeries, getNextSeries, isLastPostInSeries } = require("../../lib/seriesUtils");

  let nextSeries = null;

  // Check if this is the last post in the current series
  if (currentSeriesTitle && seriesPosts.length > 0) {
    const isLastPost = isLastPostInSeries(slug, seriesPosts);

    if (isLastPost) {
      // Get all series to find the next one
      const seriesDir = path.join(process.cwd(), "series");
      const postsDir = path.join("posts");
      const allSeries = getAllSeries(
        files,
        (filename) => fs.readFileSync(path.join(postsDir, filename), "utf-8"),
        matter,
        postsDir,
        seriesDir
      );

      // Get the next series after current one
      const nextSeriesData = getNextSeries(currentSeriesTitle, allSeries);

      if (nextSeriesData) {
        nextSeries = {
          slug: nextSeriesData.slug,
          title: nextSeriesData.title,
          postCount: nextSeriesData.postCount,
          description: nextSeriesData.description,
          level: nextSeriesData.level,
          icon: nextSeriesData.icon,
        };
      }
    }
  }

  return {
    props: {
      slug,
      frontmatter,
      contentHtml,
      wordCount,
      readingTime,
      prevPost,
      nextPost,
      seriesPosts,
      seriesTitle: currentSeriesTitle,
      nextSeries
    }
  };
}
