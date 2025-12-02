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
    <div className="border border-teal-200/40 rounded-lg bg-teal-50/60 dark:bg-teal-900/6 p-4 mb-6">
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={onKey}
        aria-expanded={open}
        aria-controls="series-list"
        className="w-full cursor-pointer flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-md bg-teal-100/60 dark:bg-teal-900/20">
            <BookOpen className="w-8 h-8 text-teal-700" />
          </div>

          <div>
            <div className="font-semibold text-teal-800 dark:text-teal-300 text-lg">
              {title}
            </div>
            <div className="text-sm text-teal-600 dark:text-teal-400">
              Part {part} of {total}
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center">
          <button
            type="button"
            aria-label={open ? "Collapse series" : "Expand series"}
            className="p-2 rounded-full bg-transparent hover:bg-teal-100/50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            <ChevronUp
              className={`w-5 h-5 text-teal-700 transform transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"
                }`}
            />
          </button>
        </div>
      </div>

      <div
        id="series-list"
        ref={innerRef}
        className="series-inner overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out mt-4"
        style={{
          maxHeight: maxHeight === "none" ? undefined : maxHeight,
          opacity: open ? 1 : 0.97,
        }}
      >
        <ol className="list-decimal list-inside text-sm text-teal-800 dark:text-teal-200 space-y-2">
          {items.map((it, idx) => {
            const isCurrent = it.slug === currentSlug;
            // show title without leading numeric prefix (so the list number is the visible one)
            const displayTitle = stripLeadingNumberPrefix(it.title || it.slug);
            return (
              <li key={it.slug} className={`${isCurrent ? "font-bold" : ""}`}>
                <Link
                  href={`/posts/${it.slug}`}
                  className={`hover:underline ${isCurrent ? "text-black dark:text-white" : "text-teal-700 dark:text-teal-300"}`}
                >
                  {displayTitle}
                </Link>
                {isCurrent && <span className="text-gray-500 ml-2 text-xs">— current</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
