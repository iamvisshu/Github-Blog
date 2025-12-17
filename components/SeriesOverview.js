import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

/**
 * SeriesOverview Component
 * Displays all available series on the homepage using a responsive grid.
 * 
 * Props:
 *  - series: Array of series objects
 */
export default function SeriesOverview({ series }) {
    // Defensive check: if no series data is passed, don't render the section
    if (!series || !Array.isArray(series) || series.length === 0) {
        return null;
    }

    return (
        <section className="mb-12" aria-labelledby="series-heading">
            {/* Section Header */}
            <div className="mb-6">
                <h2
                    id="series-heading"
                    className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2"
                >
                    <span role="img" aria-hidden="true">📚</span>
                    Learning Series
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Structured learning paths designed to help you master specific topics from start to finish.
                </p>
            </div>

            {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.map((s) => (
                    <SeriesCard key={s.slug} series={s} />
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-8 text-center">
                <Link
                    href="/series"
                    className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-bold transition-colors"
                >
                    View all series index
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

/**
 * Individual Series Card
 */
function SeriesCard({ series }) {
    if (!series) return null;

    return (
        <Link
            href={`/series/${series.slug}`}
            className="block group h-full"
            aria-label={`View series: ${series.title}`}
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-200 h-full flex flex-col">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl shrink-0" role="img" aria-hidden="true">
                        {series.icon || "📚"}
                    </span>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                            {series.title}
                        </h3>
                    </div>
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium">
                        <BookOpen className="w-3 h-3" />
                        {series.postCount} {series.postCount === 1 ? "post" : "posts"}
                    </span>
                    {series.level && (
                        <span className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-100 dark:border-indigo-800">
                            {series.level}
                        </span>
                    )}
                </div>

                {/* Description - Grows to fill space before button */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow line-clamp-3">
                    {series.description}
                </p>

                {/* CTA Button-like Link */}
                <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm group-hover:gap-3 transition-all">
                        Start Learning
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
