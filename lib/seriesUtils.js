/**
 * Series Utilities
 * Helper functions for managing blog series logic.
 * Handles both hardcoded fallback configuration and dynamic configuration from 'series/' directory.
 */

/**
 * Fallback Constants (Backward Compatibility)
 */
export const FALLBACK_SERIES_ORDER = [
    "Getting Started With Spring Boot",
    "Spring Core Concepts",
];

const DEFAULT_METADATA = {
    description: "Explore this comprehensive series of articles.",
    level: "All Levels",
    icon: "📚",
};

/**
 * Fallback Metadata map.
 * Used if no definition file is found in 'series/' folder.
 */
const FALLBACK_SERIES_METADATA = {
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
 * Get series metadata.
 * Prioritizes dynamic definition, falls back to hardcoded.
 */
export function getSeriesMetadata(seriesTitle, dynamicDefinitions = {}) {
    // 1. Check dynamic definitions (from series/*.md files)
    if (dynamicDefinitions[seriesTitle]) {
        return dynamicDefinitions[seriesTitle];
    }

    // 2. Fallback to hardcoded metadata
    if (!seriesTitle) return DEFAULT_METADATA;
    return FALLBACK_SERIES_METADATA[seriesTitle] || DEFAULT_METADATA;
}



/**
 * Actual implementation of getAllSeries with supported automation.
 * 
 * @param {Array<string>} postFiles - Files in posts/
 * @param {Function} readFileFn - (path) => content
 * @param {Function} parseFn - (content) => { data, content }
 * @param {string} [postsDir] - Path to posts directory
 * @param {string} [seriesDir] - Path to series directory (Optional)
 */
export function getAllSeries(postFiles, readFileFn, parseFn, postsDir, seriesDir) {
    if (!Array.isArray(postFiles)) return [];

    // 1. Load Series Definitions (if seriesDir provided)
    const dynamicConfig = {};
    const dynamicOrderList = [];


    // Let's try a robust approach compatible with the existing `readFileFn` loop.
    // We will assume `seriesDir` is passed. Use `fs` if available via require (Next.js server side).

    let fs = null;
    let path = null;
    try {
        fs = require('fs');
        path = require('path');
    } catch (e) { }

    if (seriesDir && fs && path && fs.existsSync(seriesDir)) {
        const defFiles = fs.readdirSync(seriesDir);
        const sortedDefs = [];

        defFiles.forEach(file => {
            if (!file.endsWith('.md')) return;
            try {
                const content = fs.readFileSync(path.join(seriesDir, file), 'utf-8');
                const parsed = parseFn(content);
                const meta = parsed.data || {};

                if (meta.title) {
                    const def = {
                        title: meta.title,
                        description: meta.description,
                        level: meta.level,
                        icon: meta.icon,
                        order: meta.order || 999,
                        slug: seriesNameToSlug(meta.title)
                    };
                    dynamicConfig[meta.title] = def;
                    sortedDefs.push(def);
                }
            } catch (err) {
                console.warn("Failed to parse series definition:", file);
            }
        });

        // Sort definitions by 'order'
        sortedDefs.sort((a, b) => a.order - b.order);
        sortedDefs.forEach(d => dynamicOrderList.push(d.title));
    }

    // 2. Process Posts
    const seriesMap = {};

    postFiles.forEach((filename) => {
        try {
            // Construct full path if postsDir provided, else assume filename is sufficient (or absolute)
            // Fix: Do NOT prepend postsDir if we are passing it to a callback that might also prepend it.
            // We'll trust readFileFn to handle the path resolution for the given filename item.
            const fileContent = readFileFn(filename);
            const parsed = parseFn(fileContent);
            const frontmatter = parsed?.data || {};

            if (!frontmatter.series) return;

            const seriesName = frontmatter.series;

            // Initialize series if new
            if (!seriesMap[seriesName]) {
                // Use dynamic config if exists, else fallback
                const meta = dynamicConfig[seriesName] || (FALLBACK_SERIES_METADATA[seriesName] || DEFAULT_METADATA);

                seriesMap[seriesName] = {
                    slug: seriesNameToSlug(seriesName),
                    title: seriesName,
                    description: meta.description,
                    level: meta.level,
                    icon: meta.icon,
                    posts: [],
                    lastUpdated: frontmatter.date || "",
                };
            }

            seriesMap[seriesName].posts.push({
                slug: filename.replace(".md", ""),
                title: frontmatter.title || "Untitled",
                part: typeof frontmatter.part === "number" ? frontmatter.part : null,
                date: frontmatter.date || "",
                readingTime: 0
            });

            // Update last updated
            const current = seriesMap[seriesName].lastUpdated;
            if (frontmatter.date && (!current || new Date(frontmatter.date) > new Date(current))) {
                seriesMap[seriesName].lastUpdated = frontmatter.date;
            }

        } catch (err) {
            console.warn(`Error processing file ${filename}:`, err);
        }
    });

    return processSeriesMap(seriesMap, dynamicOrderList);
}

/**
 * Helper to process and sort series.
 */
function processSeriesMap(seriesMap, dynamicOrderList) {
    const seriesArray = Object.values(seriesMap);

    // 1. Sort posts in series
    seriesArray.forEach(series => {
        series.posts.sort((a, b) => {
            const partA = a.part ?? Number.MAX_SAFE_INTEGER;
            const partB = b.part ?? Number.MAX_SAFE_INTEGER;
            if (partA !== partB) return partA - partB;
            return (a.title || "").localeCompare(b.title || "");
        });
        series.postCount = series.posts.length;
    });

    // 2. Sort series themselves
    const ORDER_LIST = (dynamicOrderList.length > 0) ? dynamicOrderList : FALLBACK_SERIES_ORDER;

    seriesArray.sort((a, b) => {
        const iA = ORDER_LIST.indexOf(a.title);
        const iB = ORDER_LIST.indexOf(b.title);

        if (iA !== -1 && iB !== -1) return iA - iB;
        if (iA !== -1) return -1;
        if (iB !== -1) return 1;

        return a.title.localeCompare(b.title);
    });

    return seriesArray;
}


/**
 * Get next series.
 */
export function getNextSeries(currentSeriesTitle, allSeries) {
    if (!currentSeriesTitle || !Array.isArray(allSeries)) return null;

    // Find index in the *actual* array of series we are displaying
    // This is safer than relying on a separate order list, because 'allSeries' is already sorted.
    const currentIndex = allSeries.findIndex(s => s.title === currentSeriesTitle);

    if (currentIndex === -1 || currentIndex >= allSeries.length - 1) {
        return null;
    }

    return allSeries[currentIndex + 1];
}

/**
 * Check if last post.
 */
export function isLastPostInSeries(currentSlug, seriesPosts) {
    if (!currentSlug || !Array.isArray(seriesPosts) || seriesPosts.length === 0) return false;
    const lastPost = seriesPosts[seriesPosts.length - 1];
    return lastPost?.slug === currentSlug;
}
