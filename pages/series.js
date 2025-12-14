import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { getAllSeries } from "../lib/seriesUtils";

/**
 * Page: All Series Index
 * Lists all available learning series.
 */
export default function SeriesIndexPage({ allSeries }) {
    const hasSeries = Array.isArray(allSeries) && allSeries.length > 0;

    return (
        <>
            <Head>
                <title>All Learning Series | Vishal's Blog</title>
                <meta
                    name="description"
                    content="Browse all learning series on Vishal's Blog. Structured paths to master Spring Framework, Java, and backend development."
                />
                <link rel="canonical" href="https://vishalsblog.vercel.app/series" />
            </Head>

            <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            All Learning Series
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Structured learning paths to help you master Spring Framework and Java development.
                        </p>
                    </div>

                    {/* Series List */}
                    <div className="space-y-6">
                        {hasSeries ? (
                            allSeries.map((series) => (
                                <SeriesCard key={series.slug} series={series} />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    No series found at the moment. Check back later!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Back to Home */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

/**
 * Series Card Component
 */
function SeriesCard({ series }) {
    if (!series) return null;

    const firstThreePosts = series.posts?.slice(0, 3) || [];
    const totalCount = series.posts?.length || 0;
    const remainingCount = Math.max(0, totalCount - 3);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            {/* Header: Flex col on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                <span className="text-4xl shrink-0" role="img" aria-hidden="true">
                    {series.icon || "📚"}
                </span>

                <div className="flex-1 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        {series.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {series.postCount} {series.postCount === 1 ? "post" : "posts"}
                        </span>

                        {series.lastUpdated && (
                            <>
                                <span className="hidden sm:inline">•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Updated: {series.lastUpdated}
                                </span>
                            </>
                        )}

                        {series.level && (
                            <>
                                <span className="hidden sm:inline">•</span>
                                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                                    {series.level}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {series.description}
            </p>

            {/* Post Preview List */}
            {firstThreePosts.length > 0 && (
                <div className="mb-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 ml-1">
                        Contents Preview
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {firstThreePosts.map((post) => (
                            <li key={post.slug} className="truncate">
                                <Link
                                    href={`/posts/${post.slug}`}
                                    className="hover:text-teal-600 dark:hover:text-teal-400 hover:underline transition-colors"
                                >
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                        {remainingCount > 0 && (
                            <li className="text-gray-500 dark:text-gray-400 italic pl-1 marker:text-transparent">
                                ... and {remainingCount} more {remainingCount === 1 ? "post" : "posts"}
                            </li>
                        )}
                    </ol>
                </div>
            )}

            {/* View Series Button */}
            <div className="text-right sm:text-left">
                <Link
                    href={`/series/${series.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm"
                    aria-label={`View full series: ${series.title}`}
                >
                    View Full Series
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const postsDir = path.join(process.cwd(), "posts");
        const seriesDir = path.join(process.cwd(), "series");

        // Ensure directory exists
        if (!fs.existsSync(postsDir)) {
            return { props: { allSeries: [] } };
        }

        const files = fs.readdirSync(postsDir);
        // getAllSeries uses this function for posts, but handles series reading internally via fs/path + seriesDir
        const apiRead = (f) => fs.readFileSync(path.join(postsDir, f), "utf-8");

        const allSeries = getAllSeries(files, apiRead, matter, postsDir, seriesDir);

        return {
            props: {
                allSeries,
            },
        };
    } catch (error) {
        console.error("Error in SeriesIndexPage getStaticProps:", error);
        return { props: { allSeries: [] } };
    }
}
