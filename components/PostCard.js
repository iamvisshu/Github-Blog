import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, Clock, BookOpen } from "lucide-react";

export default function PostCard({ slug, title, date, summary, tags, cover, wordCount, readingTime, series = null, part = null, seriesCount = null }) {
    return (
        <div
            key={slug}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-6 flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-start w-full break-words"
        >
            {/* Post cover image */}
            {cover && (
                <Image
                    src={cover}
                    alt={title}
                    width={150}
                    height={110}
                    className="rounded-xl flex-shrink-0"
                />
            )}

            {/* Post content */}
            <div className="flex-1 min-w-0">
                <Link href={`/posts/${slug}`}>
                    <h2 className="text-[22px] md:text-[24px] font-extrabold mb-2 cursor-pointer hover:text-teal-500 dark:hover:text-teal-400 text-black dark:text-white break-words tracking-tight">
                        {title}
                    </h2>
                </Link>

                {/* Series indicator (optional) */}
                {series && part && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span className="font-medium text-teal-600">{series}</span>
                        <span className="text-gray-500 dark:text-gray-400">  •  Part {part}{seriesCount ? ` of ${seriesCount}` : ''}</span>
                    </div>
                )}

                {/* Post meta (date, time to read, word count, tags) */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-300 mb-3">

                    {/* Date with Calendar Icon */}
                    <span className="flex items-center gap-1 text-black dark:text-white">
                        <Calendar className="w-4 h-4 text-teal-500" />
                        {date}
                    </span>

                    <span className="text-gray-400 dark:text-gray-600">|</span>

                    {/* Reading Time with Clock Icon */}
                    <span className="flex items-center gap-1 text-black dark:text-white">
                        <Clock className="w-4 h-4 text-teal-500" />
                        {readingTime} min read
                    </span>

                    <span className="text-gray-400 dark:text-gray-600">|</span>

                    {/* Word Count with Book Icon */}
                    <span className="flex items-center gap-1 text-black dark:text-white">
                        <BookOpen className="w-4 h-4 text-teal-500" />
                        {wordCount?.toLocaleString()} words
                    </span>

                    {/* Tags with Tag Icon */}
                    {tags?.length > 0 && (
                        <>
                            <span className="text-gray-400 dark:text-gray-600">|</span>
                            <div className="flex items-center gap-1">
                                <Tag className="w-4 h-4 text-teal-500" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/tags/${tag}`}
                                        className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 cursor-pointer break-words hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Summary */}
                <p className="text-gray-700 dark:text-gray-200 break-words w-full">
                    {summary || "Post summary goes here."}
                </p>
            </div>

            {/* Arrow link */}
            <div className="self-end sm:self-center">
                <Link href={`/posts/${slug}`} aria-label={`Read more: ${title}`}>
                    <span className="p-2 rounded-full bg-teal-50 dark:bg-teal-900/30 text-xl font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors flex items-center justify-center w-10 h-10">
                        &rarr;
                    </span>
                </Link>
            </div>
        </div>
    );
}