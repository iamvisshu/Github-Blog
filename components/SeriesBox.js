import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BookOpen, ChevronUp } from "lucide-react";

/**
 * SeriesBox
 * Props:
 *  - title: string (series title)
 *  - part: number (current part index, 1-based)
 *  - total: number (total parts in series)
 *  - items: Array<{ title, slug, part? }>
 *  - currentSlug: string (slug of current post)
 */
export default function SeriesBox({ title, part, total, items = [], currentSlug }) {
  const [open, setOpen] = useState(true);
  const innerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("none");

  const measureAndOpen = useCallback(() => {
    if (!innerRef.current) return;
    const scrollH = innerRef.current.scrollHeight;
    setMaxHeight(`${scrollH}px`);
    // after transition remove maxHeight to allow natural growth
    setTimeout(() => setMaxHeight("none"), 320);
  }, []);

  const measureAndClose = useCallback(() => {
    if (!innerRef.current) {
      setMaxHeight("0px");
      return;
    }
    const scrollH = innerRef.current.scrollHeight;
    // set measured height then collapse to 0 so CSS animates
    setMaxHeight(`${scrollH}px`);
    setTimeout(() => setMaxHeight("0px"), 20);
  }, []);

  useEffect(() => {
    // set initial state measurement
    if (open) measureAndOpen();
    else setMaxHeight("0px");

    const onResize = () => {
      if (open) measureAndOpen();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, measureAndOpen]);

  const toggle = () => {
    if (open) {
      // close
      measureAndClose();
      setOpen(false);
    } else {
      // open
      setOpen(true);
      // measure then remove constraint
      setTimeout(() => measureAndOpen(), 20);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  // Helper: strip leading "01 - " or "1. " style numeric prefix from title for series list only
  const stripLeadingNumberPrefix = (t) => {
    if (!t || typeof t !== "string") return t;
    return t.replace(/^\s*\d+[\.\-\)]\s*/g, "").trim();
  };

  return (
    <div className="border border-teal-100 dark:border-gray-700 rounded-xl bg-teal-50/50 dark:bg-gray-800/80 p-5 mb-8 shadow-sm">
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={onKey}
        aria-expanded={open}
        aria-controls="series-list"
        className="w-full cursor-pointer flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-teal-100 dark:border-gray-600">
            <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>

          <div>
            <div className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight mb-1">
              {title}
            </div>
            <div className="text-sm font-medium text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
              <span className="bg-teal-100 dark:bg-teal-900/50 px-2 py-0.5 rounded text-xs">
                Part {part} of {total}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center self-center">
          <button
            type="button"
            aria-label={open ? "Collapse series" : "Expand series"}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            <ChevronUp
              className={`w-5 h-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"
                }`}
            />
          </button>
        </div>
      </div>

      <div
        id="series-list"
        ref={innerRef}
        className="series-inner overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight: maxHeight === "none" ? undefined : maxHeight,
          opacity: open ? 1 : 0.97,
        }}
      >
        <div className="mt-5 pt-5 border-t border-teal-100 dark:border-gray-700">
          <ol className="list-decimal list-inside text-sm space-y-3">
            {items.map((it, idx) => {
              const isCurrent = it.slug === currentSlug;
              // show title without leading numeric prefix (so the list number is the visible one)
              const displayTitle = stripLeadingNumberPrefix(it.title || it.slug);
              return (
                <li key={it.slug} className={`pl-1 ${isCurrent ? "font-bold text-teal-700 dark:text-teal-400 marker:text-teal-600 dark:marker:text-teal-400" : "text-gray-600 dark:text-gray-400 marker:text-gray-400 dark:marker:text-gray-600"}`}>
                  <Link
                    href={`/posts/${it.slug}`}
                    className={`hover:underline block sm:inline transition-colors ${isCurrent ? "" : "hover:text-teal-600 dark:hover:text-teal-300"}`}
                  >
                    {displayTitle}
                  </Link>
                  {isCurrent && (
                    <span className="inline-block ml-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold text-white bg-teal-600 dark:bg-teal-500 rounded-sm leading-none align-middle relative -top-px">
                      Current
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>

  );
}
