// components/Sidebar.js
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, Globe, Twitter, BadgeCheck } from "lucide-react";

/**
 * Sidebar component
 * Props:
 *  - allTags: object { tagName: count, ... }
 *  - isHomepage: boolean
 */
export default function Sidebar({ allTags, isHomepage = false }) {
  // Show fewer tags initially
  const VISIBLE_TAGS = 8;

  // Visibility on different pages (keeps your existing logic)
  const visibilityClass = !isHomepage ? "hidden md:flex" : "flex";

  // Defensive: if there's no tags data, render a placeholder box
  if (!allTags || typeof allTags !== "object" || Object.keys(allTags).length === 0) {
    return (
      <aside className={`${visibilityClass} w-full md:w-80 flex-col space-y-6`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <p className="text-gray-500 dark:text-gray-300">Loading tags...</p>
        </div>
      </aside>
    );
  }

  // Prepare sorted tag array once (desc by count)
  const sortedTags = useMemo(() => {
    return Object.entries(allTags)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [allTags]);

  const [expanded, setExpanded] = useState(false);

  // Sliced tags to display when not expanded
  const visibleList = expanded ? sortedTags : sortedTags.slice(0, VISIBLE_TAGS);

  return (
    <aside className={`${visibilityClass} w-full md:w-80 flex-col space-y-6`}>

      {/* BIO / SOCIAL */}
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
            aria-hidden="true"
          />
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Vishal Vishwakarma, is a Senior Software Developer with a comprehensive professional IT experience of over five years in software development and coding.
        </p>

        <hr className="w-full border-t border-gray-200 dark:border-gray-700 mb-4" />

        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-200 p-2 rounded-full text-teal-700 dark:bg-teal-900 dark:text-teal-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-200 p-2 rounded-full text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
            aria-label="Twitter/X"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://iamvisshu.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-200 p-2 rounded-full text-green-700 dark:bg-green-900 dark:text-green-200"
            aria-label="Portfolio"
          >
            <Globe className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-200 p-2 rounded-full text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* TAGS */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h4 className="font-bold mb-4 dark:text-white">Tags</h4>

        {/* Tag pills container
            NOTE: This is the updated wrapper that uses the collapsible CSS.
            Replace your old `div` with this one (see step above). */}
        <div
          id="sidebar-tags-list"
          className={`collapsible-container ${expanded ? "expanded" : "collapsed"} flex flex-wrap gap-2`}
        >
          {visibleList.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400 transition-colors
                         hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500"
              title={`${tag} (${count})`}
            >
              {tag} <span className="text-xs text-gray-500 dark:text-gray-300">({count})</span>
            </Link>
          ))}
        </div>

        {/* show more / show less */}
        {sortedTags.length > VISIBLE_TAGS && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-sm font-medium text-teal-600 dark:text-teal-300 hover:underline focus:outline-none"
              aria-expanded={expanded}
              aria-controls="sidebar-tags-list"
            >
              {expanded ? "Show less" : `Show ${sortedTags.length - VISIBLE_TAGS} more`}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
