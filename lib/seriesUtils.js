/**
 * Series Utilities
 * Helper functions for managing blog series logic.
 * properly handles null checks and edge cases.
 */

/**
 * Constants
 */
export const SERIES_ORDER = [
    "Getting Started With Spring Boot",
    "Spring Core Concepts",
    // Add new series titles here
];

const DEFAULT_METADATA = {
    description: "Explore this comprehensive series of articles.",
    level: "All Levels",
    icon: "📚",
};

/**
 * Metadata map for series.
 * Keys must match exactly with the 'series' frontmatter in markdown files.
 */
const SERIES_METADATA = {
    "Getting Started With Spring Boot": {
        description: "A beginner-friendly introduction to Spring Boot, covering fundamentals and core concepts.",
        level: "Beginner",
        icon: "🚀",
    },
    "Spring Core Concepts": {
        description: "Deep dive into Spring Framework internals, beans, dependency injection, and advanced concepts.",
        level: "Intermediate",
        icon: "🎓",
    },
};

/**
 * Convert series title to URL-friendly slug.
 * Handles null/undefined inputs safely.
 * @param {string} seriesName
 * @returns {string}
 */
export function seriesNameToSlug(seriesName) {
    if (!seriesName || typeof seriesName !== "string") return "";
    return seriesName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Get series metadata safely.
 * @param {string} seriesTitle
 * @returns {object} metadata
 */
export function getSeriesMetadata(seriesTitle) {
    if (!seriesTitle) return DEFAULT_METADATA;
    return SERIES_METADATA[seriesTitle] || DEFAULT_METADATA;
}

/**
 * Extract all series from posts with metadata.
 * Includes defensive coding against missing files or malformed frontmatter.
 *
 * @param {Array<string>} files - Array of markdown filenames
 * @param {Function} readFileFn - Function to read file content
 * @param {Function} parseFn - Function to parse frontmatter
 * @returns {Array<object>} Array of series objects
 */
export function getAllSeries(files, readFileFn, parseFn) {
    if (!Array.isArray(files)) return [];

    const seriesMap = {};

    files.forEach((filename) => {
        try {
            const fileContent = readFileFn(filename);
            // Ensure specific safe access to data
            const parsed = parseFn(fileContent);
            const frontmatter = parsed?.data || {};

            if (!frontmatter.series) return;

            const seriesName = frontmatter.series;

            // Initialize series entry if not exists
            if (!seriesMap[seriesName]) {
                const metadata = getSeriesMetadata(seriesName);
                seriesMap[seriesName] = {
                    slug: seriesNameToSlug(seriesName),
                    title: seriesName,
                    description: metadata.description,
                    level: metadata.level,
                    icon: metadata.icon,
                    posts: [],
                    lastUpdated: frontmatter.date || "",
                };
            }

            // Add post to series
            seriesMap[seriesName].posts.push({
                slug: filename.replace(".md", ""),
                title: frontmatter.title || "Untitled Post",
                part: typeof frontmatter.part === "number" ? frontmatter.part : null,
                date: frontmatter.date || "",
                readingTime: 0, // Will be populated if needed by consumer
            });

            // Update last updated date logic
            const currentLastUpdated = seriesMap[seriesName].lastUpdated;
            const postDate = frontmatter.date;

            if (postDate && (!currentLastUpdated || new Date(postDate) > new Date(currentLastUpdated))) {
                seriesMap[seriesName].lastUpdated = postDate;
            }

        } catch (err) {
            console.warn(`Error processing file ${filename} for series:`, err);
        }
    });

    return processSeriesMap(seriesMap);
}

/**
 * Helper to process, sort and format the series map into an array.
 * Reduces cognitive complexity of the main function.
 */
function processSeriesMap(seriesMap) {
    const seriesArray = Object.values(seriesMap);

    // 1. Sort posts within each series
    seriesArray.forEach((series) => {
        series.posts.sort((a, b) => {
            // Sort by part number if available
            const partA = a.part ?? Number.MAX_SAFE_INTEGER;
            const partB = b.part ?? Number.MAX_SAFE_INTEGER;

            if (partA !== partB) return partA - partB;

            // Fallback to alphabetical title sort
            return (a.title || "").localeCompare(b.title || "");
        });

        series.postCount = series.posts.length;
    });

    // 2. Sort series based on defined order or title
    seriesArray.sort((a, b) => {
        const indexA = SERIES_ORDER.indexOf(a.title);
        const indexB = SERIES_ORDER.indexOf(b.title);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return a.title.localeCompare(b.title);
    });

    return seriesArray;
}

/**
 * Get the next series after the current one safely.
 * @param {string} currentSeriesTitle
 * @param {Array} allSeries
 * @returns {object|null}
 */
export function getNextSeries(currentSeriesTitle, allSeries) {
    if (!currentSeriesTitle || !Array.isArray(allSeries)) return null;

    const currentIndex = SERIES_ORDER.indexOf(currentSeriesTitle);

    // If series not in our ordered list, or it's the last one, return null
    if (currentIndex === -1 || currentIndex >= SERIES_ORDER.length - 1) {
        return null;
    }

    const nextSeriesTitle = SERIES_ORDER[currentIndex + 1];
    return allSeries.find((s) => s.title === nextSeriesTitle) || null;
}

/**
 * Check if a post is the last post in its series.
 * @param {string} currentSlug
 * @param {Array} seriesPosts
 * @returns {boolean}
 */
export function isLastPostInSeries(currentSlug, seriesPosts) {
    if (!currentSlug || !Array.isArray(seriesPosts) || seriesPosts.length === 0) {
        return false;
    }
    const lastPost = seriesPosts[seriesPosts.length - 1];
    return lastPost?.slug === currentSlug;
}
