import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ numPages, currentPage, basePath = "/page/" }) {
    if (numPages <= 1) return null;

    // Helper to generate page link
    const getPageLink = (page) => {
        if (page === 1) {
            return basePath === "/page/" ? "/" : basePath.replace("/page/", "");
        }
        // handle tags pagination: /tags/[tag]/page/[page] vs /page/[page]
        // if basePath is "/page/", page 2 -> "/page/2"
        // if basePath is "/tags/java/page/", page 2 -> "/tags/java/page/2"
        return `${basePath}${page}`;
    };

    const renderPageButton = (page, isActive = false) => (
        <Link
            key={page}
            href={getPageLink(page)}
            className={`relative inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm font-semibold rounded-lg transition-colors focus:z-20 ${isActive
                ? "z-10 bg-teal-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                : "text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
        >
            {page}
        </Link>
    );

    const renderEllipsis = (key) => (
        <span key={key} className="relative inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 rounded-lg">
            ...
        </span>
    );

    // LOGIC:
    // We want to show:
    // 1. First Page [1]
    // 2. ... if gap > 1
    // 3. Neighbors (Current-1, Current, Current+1)
    // 4. ... if gap > 1
    // 5. Last Page [N]

    const items = [];

    // Previous Button
    if (currentPage > 1) {
        items.push(
            <Link
                key="prev"
                href={getPageLink(currentPage - 1)}
                className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 mr-2"
            >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
        );
    }

    // Always show 1
    items.push(renderPageButton(1, currentPage === 1));

    // Determine window around current page
    // We want to show at least Current-1, Current, Current+1
    // But we need to handle overlaps with 1 and numPages
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(numPages - 1, currentPage + 1);

    // If current is near start (e.g. 1, 2, 3), ensure we show enough pages
    if (currentPage <= 3) {
        end = Math.min(numPages - 1, 4);
    }
    // If current is near end, ensure we show enough pages
    if (currentPage >= numPages - 2) {
        start = Math.max(2, numPages - 3);
    }

    // Show first ellipsis if needed
    if (start > 2) {
        items.push(renderEllipsis("ellipsis-start"));
    }

    // Render the middle window
    for (let i = start; i <= end; i++) {
        items.push(renderPageButton(i, currentPage === i));
    }

    // Show second ellipsis if needed
    if (end < numPages - 1) {
        items.push(renderEllipsis("ellipsis-end"));
    }

    // Always show Last Page (if numPages > 1)
    if (numPages > 1) {
        items.push(renderPageButton(numPages, currentPage === numPages));
    }

    // Next Button
    if (currentPage < numPages) {
        items.push(
            <Link
                key="next"
                href={getPageLink(currentPage + 1)}
                className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 ml-2"
            >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
        );
    }

    return (
        <nav className="flex items-center justify-center border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0 mt-10 pt-6">
            <div className="flex items-center gap-2">
                {items}
            </div>
        </nav>
    );
}
