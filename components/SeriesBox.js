import Link from "next/link";
import { BookOpen, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * SeriesBox
 * Props:
 *  - title: string (series title)
 *  - posts: [{ title, slug, part }] ordered by part ascending (from getStaticProps)
 *  - currentSlug: string
 */
export default function SeriesBox({ title, posts = [], currentSlug }) {
  if (!title || !posts || posts.length === 0) return null;

  // Detect duplicate part numbers
  const partCounts = posts.reduce((acc, p) => {
    const k = p.part !== null && p.part !== undefined ? String(p.part) : "";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const hasDuplicates = Object.values(partCounts).some(c => c > 1);

  // Build displayPosts with fallback ordering if parts duplicate or missing
  const displayPosts = posts.map((p, idx) => {
    const preferredPart = p.part !== null && p.part !== undefined ? Number(p.part) : null;
    return {
      ...p,
      preferredPart,
      // displayPart not printed before each title (we rely on <ol> numbering),
      // but compute it for "Part X of Y".
      displayPart: preferredPart || (idx + 1)
    };
  });

  // Persist collapse state
  const storageKey = `seriesbox:${title}:collapsed`;
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) setCollapsed(JSON.parse(raw));
    } catch (e) {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(collapsed));
    } catch (e) {}
  }, [collapsed, storageKey]);

  const total = displayPosts.length;
  const currentIndex = displayPosts.findIndex(p => p.slug === currentSlug);
  const currentPart = currentIndex === -1 ? null : displayPosts[currentIndex].displayPart;

  return (
    <div className="mb-6 rounded-lg border border-teal-100 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20 overflow-hidden">
      <div className="flex items-start justify-between p-4">
        <div className="flex items-start gap-3 min-w-0 w-full">
          {/* Bigger book icon so title + subtitle can wrap */}
          <div className="flex-shrink-0 mt-0.5">
            <BookOpen className="w-10 h-10 text-teal-700 dark:text-teal-200" />
          </div>

          {/* Title + Part container - flex-grow so it can wrap to multiple lines */}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-teal-700 dark:text-teal-200 leading-tight truncate">
              {title}
            </div>
            <div className="text-xs text-teal-700 dark:text-teal-300 mt-0.5">
              {currentPart ? `Part ${currentPart} of ${total}` : `Part 1 of ${total}`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-3">
          {hasDuplicates && (
            <div title="Duplicate part numbers detected" className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="hidden sm:inline">Part numbers duplicate</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1 rounded-full hover:bg-teal-100 dark:hover:bg-teal-800 transition"
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand series" : "Collapse series"}
          >
            {collapsed ? <ChevronDown className="w-5 h-5 text-teal-700 dark:text-teal-200" /> : <ChevronUp className="w-5 h-5 text-teal-700 dark:text-teal-200" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="px-4 pb-4">
          {/* Use browser ol numbering on the left; ensure list items' content are inline so number stays on same line */}
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {displayPosts.map((p) => {
              const isCurrent = p.slug === currentSlug;
              return (
                <li key={p.slug} className="min-w-0">
                  {/* Keep link/text inline so the list marker is on the same line.
                      Use break-words/whitespace-normal so long titles wrap and do not overflow. */}
                  {isCurrent ? (
                    <span className="font-semibold text-neutral-900 dark:text-white leading-snug break-words whitespace-normal">
                      {p.title}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">— current</span>
                    </span>
                  ) : (
                    <Link href={`/posts/${p.slug}`} className="text-teal-700 hover:underline inline leading-snug break-words whitespace-normal max-w-full">
                      {p.title}
                    </Link>
                  )}

                  {/* If preferredPart exists and differs from displayPart (due to fallback), show small hint */}
                  {p.preferredPart && p.preferredPart !== p.displayPart && (
                    <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      (frontmatter part: {p.preferredPart}, using order {p.displayPart})
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
