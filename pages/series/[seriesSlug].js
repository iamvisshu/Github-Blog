import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import { BookOpen, Calendar, Clock, ArrowRight, ChevronLeft } from "lucide-react";
import { getAllSeries } from "../../lib/seriesUtils";

/**
 * Series Detail Page
 * Shows full list of posts for a specific series.
 */
export default function SeriesDetailPage({ series, nextSeries, prevSeries }) {
    // Handle 404/Empty State gracefully
    if (!series) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Series not found</h1>
                <Link href="/series" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
                    Browse all series
                </Link>
            </div>
        );
    }

    // Calculate total reading time safely
    const totalReadingTime = series.posts?.reduce((sum, post) => sum + (post.readingTime || 0), 0) || 0;
    const firstPostSlug = series.posts?.[0]?.slug;

    return (
        <>
            <Head>
                <title>{series.title} | Vishal's Blog</title>
                <meta name="description" content={series.description || `Read the complete ${series.title} series.`} />
                <link
                    rel="canonical"
                    href={`https://vishalsblog.vercel.app/series/${series.slug}`}
                />
            </Head>

            <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/series" className="hover:text-teal-600 dark:hover:text-teal-400 hover:underline">
                                    Series
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
                                {series.title}
                            </li>
                        </ol>
                    </nav>

                    {/* Series Header Card */}
                    <header className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <span className="text-6xl shrink-0 select-none" role="img" aria-label="Series icon">
                                {series.icon || "📚"}
                            </span>

                            <div className="flex-1 w-full">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                                    {series.title}
                                </h1>

                                {/* Meta Badges */}
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">
                                        <BookOpen className="w-4 h-4" />
                                        {series.postCount} Parts
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">
                                        <Clock className="w-4 h-4" />
                                        ~{totalReadingTime} mins
                                    </span>
                                    {series.level && (
                                        <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium">
                                            {series.level}
                                        </span>
                                    )}
                                </div>

                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    {series.description}
                                </p>

                                {firstPostSlug ? (
                                    <Link
                                        href={`/posts/${firstPostSlug}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-lg transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                                    >
                                        Start Reading Series
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                ) : (
                                    <span className="text-gray-500 italic">No posts available yet.</span>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Posts List Section */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <span>📖</span> Table of Contents
                        </h2>

                        <ol className="space-y-4">
                            {series.posts.map((post, index) => (
                                <li key={post.slug} className="group relative">
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                                    >
                                        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-bold text-sm">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-lg mb-1">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                {post.readingTime > 0 && <span>{post.readingTime} min read</span>}
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-all self-center transform translate-x-[-10px] group-hover:translate-x-0" />
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Series Navigation (Prev/Next) */}
                    {(prevSeries || nextSeries) && (
                        <nav aria-label="Series navigation" className="flex flex-col md:flex-row gap-4 mb-12">
                            {/* Previous Series */}
                            {prevSeries ? (
                                <Link
                                    href={`/series/${prevSeries.slug}`}
                                    className="flex-1 group flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all"
                                >
                                    <ChevronLeft className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:-translate-x-1 transition-transform" />
                                    <div>
                                        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">Previous Series</div>
                                        <div className="font-bold text-gray-900 dark:text-white text-lg">{prevSeries.title}</div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden md:block flex-1" />
                            )}

                            {/* Next Series */}
                            {nextSeries ? (
                                <Link
                                    href={`/series/${nextSeries.slug}`}
                                    className="flex-1 group flex items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all text-right"
                                >
                                    <div className="w-full">
                                        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold mb-1">Next Series</div>
                                        <div className="font-bold text-gray-900 dark:text-white text-lg">{nextSeries.title}</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
                                </Link>
                            ) : (
                                <div className="hidden md:block flex-1" />
                            )}
                        </nav>
                    )}

                    {/* Footer Link */}
                    <div className="text-center pb-8">
                        <Link
                            href="/series"
                            className="px-4 py-2 rounded-full text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium transition-colors"
                        >
                            Browse all series
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    try {
        const postsDir = path.join(process.cwd(), "posts");
        if (!fs.existsSync(postsDir)) return { paths: [], fallback: false };

        const files = fs.readdirSync(postsDir);
        const apiFileRead = (f) => fs.readFileSync(path.join(postsDir, f), "utf-8");

        const seriesDir = path.join(process.cwd(), "series");
        const allSeries = getAllSeries(files, apiFileRead, matter, postsDir, seriesDir);

        const paths = allSeries.map((series) => ({
            params: { seriesSlug: series.slug },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error("Error generating series paths:", error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const { seriesSlug } = params;
        const postsDir = path.join(process.cwd(), "posts");
        const files = fs.readdirSync(postsDir);
        const apiFileRead = (f) => fs.readFileSync(path.join(postsDir, f), "utf-8");

        const seriesDir = path.join(process.cwd(), "series");
        const allSeries = getAllSeries(files, apiFileRead, matter, postsDir, seriesDir);
        const series = allSeries.find((s) => s.slug === seriesSlug);

        if (!series) {
            return { notFound: true };
        }

        // Enrich posts with reading time
        const enrichedPosts = series.posts.map((post) => {
            try {
                const fileContent = apiFileRead(`${post.slug}.md`);
                const { content } = matter(fileContent);
                const wordCount = content.split(/\s/g).length;
                return {
                    ...post,
                    readingTime: Math.ceil(wordCount / 200)
                };
            } catch (e) {
                return { ...post, readingTime: 0 };
            }
        });

        const currentIndex = allSeries.findIndex((s) => s.slug === seriesSlug);
        const prevSeries = currentIndex > 0 ? allSeries[currentIndex - 1] : null;
        const nextSeries = currentIndex < allSeries.length - 1 ? allSeries[currentIndex + 1] : null;

        return {
            props: {
                series: { ...series, posts: enrichedPosts },
                nextSeries,
                prevSeries,
            },
        };
    } catch (error) {
        console.error("Error in getStaticProps for series:", error);
        return { notFound: true };
    }
}
