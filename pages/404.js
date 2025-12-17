import Link from "next/link";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Home, Search, Tag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Custom404({ topTags }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <>
            <Head>
                <title>404 - Page Not Found | Vishal's Blog</title>
                <meta name="description" content="The page you are looking for does not exist. Explore other tutorials and guides on Vishal's Blog." />
            </Head>

            {/* Re-doing layout for better stability */}
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center pb-20 pt-10 bg-gray-50 dark:bg-gray-900">
                <h1 className="text-6xl md:text-8xl font-black text-teal-600 dark:text-teal-500 mb-6 drop-shadow-sm">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    We couldn't find the page you were looking for.
                    Check the URL, or try searching for something else.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full max-w-md mb-10 relative">
                    <input
                        type="text"
                        placeholder="Search for posts..."
                        className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>

                {/* Popular Tags */}
                {topTags && topTags.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                            Popular Topics
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {topTags.map(tag => (
                                <Link
                                    key={tag}
                                    href={`/tags/${tag}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-teal-500 dark:hover:border-teal-500 transition-all text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                                >
                                    <Tag className="w-4 h-4" />
                                    <span>{tag}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back to Home */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-transform hover:-translate-y-1 shadow-lg hover:shadow-teal-500/30"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const postsDir = path.join("posts");
    const files = fs.readdirSync(postsDir);
    let allTags = {};

    files.forEach(filename => {
        const markdownWithMeta = fs.readFileSync(path.join(postsDir, filename), "utf-8");
        const { data: frontmatter } = matter(markdownWithMeta);

        (frontmatter.tags || []).forEach(tag => {
            allTags[tag] = allTags[tag] ? allTags[tag] + 1 : 1;
        });
    });

    // Sort tags by count (descending) and take top 5
    const topTags = Object.entries(allTags)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([tag]) => tag);

    return {
        props: {
            topTags,
        },
    };
}
