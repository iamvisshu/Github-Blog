import Link from "next/link";
import Image from "next/image";

export default function PostCard({ slug, title, date, summary, tags, cover }) {
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
                <h2 className="text-2xl font-black mb-2 cursor-pointer hover:text-teal-500 dark:hover:text-teal-400 text-black dark:text-white break-words">
                    {title}
                </h2>
            </Link>

            {/* Post meta (date + tags) */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-2">
                <span>{date}</span>
                {tags?.map(tag => (
                    <Link
                        key={tag}
                        href={`/tags/${tag}`} // Link to the tag page
                        className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded px-2 py-0.5 cursor-pointer break-words hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                    >
                        {tag}
                    </Link>
                ))}
            </div>

            {/* Summary */}
            <p className="text-gray-700 dark:text-gray-200 break-words w-full">
                {summary || "Post summary goes here."}
            </p>
        </div>

        {/* Arrow link */}
        <div className="self-end sm:self-center">
            <Link href={`/posts/${slug}`}>
                <span className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900 text-xl font-bold text-indigo-700 dark:text-indigo-200 cursor-pointer">
                    &rarr;
                </span>
            </Link>
        </div>
    </div>
  );
}