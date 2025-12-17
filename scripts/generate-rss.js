const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DOMAIN = "https://vishalsblog.vercel.app";
const POSTS_DIR = path.join(process.cwd(), "posts");
const OUTPUT_PATH = path.join(process.cwd(), "public", "feed.xml");

// --- Helpers ---------------------------------------------------------------
function ensurePublicDir() {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
}

function parseDateFromFrontmatter(dateValue, fallbackFilePath) {
    // Support "DD-MM-YYYY" or ISO
    if (!dateValue) {
        const stats = fs.statSync(fallbackFilePath);
        return stats.mtime;
    }

    if (typeof dateValue === "string") {
        // DD-MM-YYYY
        const ddmmyyyy = /^\d{2}-\d{2}-\d{4}$/;
        if (ddmmyyyy.test(dateValue)) {
            const [dd, mm, yyyy] = dateValue.split("-");
            // Use UTC to avoid timezone shifts
            return new Date(Date.UTC(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd), 0, 0, 0));
        }
        // try parse as ISO/other
        const dt = new Date(dateValue);
        if (!isNaN(dt.getTime())) return dt;
    }

    // fallback: file mtime
    const stats = fs.statSync(fallbackFilePath);
    return stats.mtime;
}

function escapeXml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// --- Read Posts ------------------------------------------------------------
function readPosts() {
    if (!fs.existsSync(POSTS_DIR)) return [];
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

    const posts = files.map((file) => {
        const slug = file.replace(/\.md$/, "");
        const full = path.join(POSTS_DIR, file);
        const raw = fs.readFileSync(full, "utf8");
        const fm = matter(raw);
        const dateObj = parseDateFromFrontmatter(fm.data?.date, full);

        return {
            slug,
            title: fm.data?.title || slug,
            date: dateObj,
            description: fm.data?.summary || fm.data?.description || "",
            author: fm.data?.author || "Vishal Vishwakarma"
        };
    });

    // Sort posts by date descending (newest first)
    posts.sort((a, b) => b.date - a.date);
    return posts;
}

// --- Generate RSS XML -------------------------------------------------------
function generateRss(posts) {
    const lastBuildDate = new Date().toUTCString();

    const items = posts.map(post => {
        const link = `${DOMAIN}/posts/${post.slug}`;
        const pubDate = post.date.toUTCString();

        return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>${escapeXml(post.author)}</author>
    </item>`;
    }).join("\n");

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vishal's Blog</title>
    <link>${DOMAIN}</link>
    <description>Learn and Explore Java Programming, Spring Boot, and more.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return rss;
}

// --- Run -------------------------------------------------------------------
function run() {
    try {
        const posts = readPosts();
        const xml = generateRss(posts);
        ensurePublicDir();
        fs.writeFileSync(OUTPUT_PATH, xml, { encoding: "utf8" });
        console.log(`✓ feed.xml generated: ${OUTPUT_PATH}`);
    } catch (err) {
        console.error("Error generating RSS feed:", err);
        process.exit(1);
    }
}

run();
