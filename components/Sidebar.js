import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, Globe, Twitter, BadgeCheck } from "lucide-react";

/**
 * Reusable Sidebar component for the blog index and pagination pages.
 * @param {object} props.allTags - An object containing tags and their post counts.
 * @param {boolean} props.isHomepage - True if the current page is the root index ('/').
 */
export default function Sidebar({ allTags, isHomepage = false }) {

  // Logic:
  // If NOT homepage (Page 2+): hidden on mobile, but flex (visible) on md (desktop).
  // If homepage (Page 1): always flex (visible).
  const visibilityClass = !isHomepage ? "hidden md:flex" : "flex";

  // Defensive check for rendering empty sidebar if data is missing
  if (!allTags || typeof allTags !== 'object' || Object.keys(allTags).length === 0) {
    return (
        <aside className={`${visibilityClass} w-full md:w-80 flex-col space-y-6`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-gray-500 dark:text-gray-300">Loading tags...</p>
            </div>
        </aside>
    );
  }

  return (
    // MODIFIED: Applied conditional visibility and stacking classes
    <aside className={`${visibilityClass} w-full md:w-80 flex-col space-y-6`}>

      {/* SECTION 1: Bio and Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center">
        <Image
          src="/images/avatar.jpg"
          width={120}
          height={120}
          alt="Profile"
          className="rounded-xl object-cover mb-4 shadow-lg"
        />

        <div className="flex items-center gap-1 mb-3">
            <p className="font-bold text-xl text-black dark:text-white">@iamvisshu</p>
            <BadgeCheck
                className="w-5 h-5 text-white fill-blue-500 dark:fill-blue-400"
                strokeWidth={2.5}
            />
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Vishal Vishwakarma, is a Senior Software Developer with a comprehensive professional IT experience of over five years in software development and coding.
        </p>

        {/* Visual Divider */}
        <hr className="w-full border-t border-gray-200 dark:border-gray-700 mb-4" />

        {/* Social links */}
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-200 p-2 rounded-full text-teal-700 dark:bg-teal-900 dark:text-teal-200"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-200 p-2 rounded-full text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://iamvisshu.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-200 p-2 rounded-full text-green-700 dark:bg-green-900 dark:text-green-200"
          >
            <Globe className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-200 p-2 rounded-full text-blue-700 dark:bg-blue-900 dark:text-blue-200"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* SECTION 2: Dynamic Tags */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h4 className="font-bold mb-4 dark:text-white">Tags</h4>
        {/* New flex layout for the pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(allTags).sort(([tagA, countA], [tagB, countB]) => countB - countA).map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 transition-colors
                         hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500"
            >
              {tag} ({count})
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}