import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle } from "lucide-react";

/**
 * NextSeriesCard Component
 * Shows a card suggesting the next series when user completes current series.
 * 
 * Design:
 * - Mobile: Stacked content, full width button
 * - Desktop: Horizontal layout, auto width button
 * 
 * Props:
 *  - currentSeriesTitle: string
 *  - nextSeries: object { slug, title, postCount, description, icon, level }
 */
export default function NextSeriesCard({ currentSeriesTitle, nextSeries }) {
    if (!nextSeries) return null;

    return (
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-200 dark:border-teal-700">
            {/* Completion Message */}
            <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0" />
                <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100">
                    🎉 You've completed "{currentSeriesTitle}"
                </h3>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium">
                Ready for the next challenge?
            </p>

            {/* Next Series Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl" role="img" aria-label="series icon">
                                {nextSeries.icon || "📚"}
                            </span>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                {nextSeries.title}
                            </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                {nextSeries.postCount} {nextSeries.postCount === 1 ? "post" : "posts"}
                            </span>
                            {nextSeries.level && (
                                <>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                                        {nextSeries.level}
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {nextSeries.description}
                        </p>
                    </div>

                    {/* Start Series Button - Full width on mobile */}
                    <Link
                        href={`/series/${nextSeries.slug}`}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900"
                        aria-label={`Start series: ${nextSeries.title}`}
                    >
                        Start Series
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* View All Series Link */}
            <div className="mt-4 text-center">
                <Link
                    href="/series"
                    className="inline-block text-sm text-teal-700 dark:text-teal-400 hover:underline py-1"
                >
                    View all learning series →
                </Link>
            </div>
        </div>
    );
}
