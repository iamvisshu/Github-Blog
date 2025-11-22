// scripts/generate-sitemap.js
// Generates a single sitemap.xml that includes:
//  - homepage and static pages
//  - all posts from /posts/*.md (uses frontmatter date in DD-MM-YYYY or ISO)
//  - one URL per tag found in frontmatter (encoded)
// Produces an XML header including xmlns:xsi and xsi:schemaLocation (like xml-sitemaps.com)

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DOMAIN = "https://vishalsblog.vercel.app";
const POSTS_DIR = path.join(process.cwd(), "posts");
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");

// --- helpers ---------------------------------------------------------------
function ensurePublicDir() {
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
}

function parseDateFromFrontmatter(dateValue, fallbackFilePath) {
  // Support "DD-MM-YYYY" or ISO or other JS-parseable formats.
  if (!dateValue) {
    const stats = fs.statSync(fallbackFilePath);
    return stats.mtime;
  }

  if (typeof dateValue === "string") {
    // DD-MM-YYYY
    const ddmmyyyy = /^\d{2}-\d{2}-\d{4}$/;
    if (ddmmyyyy.test(dateValue)) {
      const [dd, mm, yyyy] = dateValue.split("-");
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

function toXmlDate(dt) {
  // Return format: YYYY-MM-DDTHH:mm:ss+00:00 (match sample)
  // Use UTC
  const iso = new Date(dt).toISOString(); // e.g. 2025-11-22T13:37:00.000Z
  return iso.replace(".000Z", "+00:00");
}

// --- read posts ------------------------------------------------------------
function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const full = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const fm = matter(raw);
    const dateObj = parseDateFromFrontmatter(fm.data?.date, full);
    const lastmod = toXmlDate(dateObj);
    const tags = Array.isArray(fm.data?.tags)
      ? fm.data.tags.map((t) => String(t).trim()).filter(Boolean)
      : (typeof fm.data?.tags === "string" ? [fm.data.tags.trim()] : []);
    const title = fm.data?.title || slug;
    return { slug, title, lastmod, tags };
  });

  // sort posts by lastmod ascending (old -> new) if you want specific ordering
  // posts.sort((a,b) => new Date(a.lastmod) - new Date(b.lastmod));
  return posts;
}

// --- collect tags ----------------------------------------------------------
function collectUniqueTags(posts) {
  const set = new Set();
  posts.forEach((p) => {
    (p.tags || []).forEach((t) => {
      if (t && t.length) set.add(t);
    });
  });
  return Array.from(set);
}

// --- build URL objects -----------------------------------------------------
function buildUrlObjects() {
  const urls = [];

  // homepage + static pages (adjust/extend as you want)
  urls.push({
    loc: `${DOMAIN}/`,
    lastmod: toXmlDate(new Date()),
    priority: "1.00",
  });

  // Add static pages that you want in sitemap
  const staticPages = ["/about", "/tags"];
  staticPages.forEach((p) =>
    urls.push({
      loc: `${DOMAIN}${p}`,
      lastmod: toXmlDate(new Date()),
      priority: "0.80",
    })
  );

  const posts = readPosts();
  posts.forEach((p) => {
    urls.push({
      loc: `${DOMAIN}/posts/${p.slug}`,
      lastmod: p.lastmod,
      priority: "0.80",
    });
  });

  // Tag pages
  const tags = collectUniqueTags(posts);
  tags.forEach((tag) => {
    // Build URL-safe tag slug — encodeURIComponent keeps spaces and special chars safe
    const tagPath = `/tags/${encodeURIComponent(tag)}`;
    urls.push({
      loc: `${DOMAIN}${tagPath}`,
      lastmod: toXmlDate(new Date()),
      priority: "0.70",
    });
  });

  // (Optional) You can add pagination pages if you want. Add here if needed.

  return urls;
}

// --- generate xml ---------------------------------------------------------
function generateXml(urls) {
  // Use extended header including xsi and schemaLocation (matches xml-sitemaps.com)
  const header =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset\n' +
    '      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
    '      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    '      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n' +
    '            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  const body = urls
    .map((u) => {
      return `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`;
    })
    .join("\n");

  const footer = "\n</urlset>\n";
  return header + body + footer;
}

// --- write file ------------------------------------------------------------
function writeSitemapFile(xml) {
  ensurePublicDir();
  fs.writeFileSync(OUTPUT_PATH, xml, { encoding: "utf8" });
  console.log(`✓ sitemap.xml generated: ${OUTPUT_PATH}`);
}

// --- run ------------------------------------------------------------------
function run() {
  try {
    const urls = buildUrlObjects();
    const xml = generateXml(urls);
    writeSitemapFile(xml);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    process.exit(1);
  }
}

run();
