# Project Title

`Github Blog by @iamvisshu` : A modern, feature-rich Next.js blog template. Fast, fully responsive, with rich content metadata (Reading Time, Word Count), global search, and dynamic pagination.

## Project Structure

This project follows a standard file organization with a focus on separating source code, documentation, and configuration files.

```text
📦
Github-Blog/
├── .gitignore
├── components/
│   ├── Footer.js
│   ├── Header.js
│   ├── Layout.js
│   ├── NextSeriesCard.js
│   ├── PostCard.js
│   ├── SeriesBox.js
│   ├── SeriesOverview.js
│   └── Sidebar.js
├── lib/
│   └── seriesUtils.js
├── LICENSE
├── next.config.js
├── package-lock.json
├── package.json
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── about.js
│   ├── api/
│   │   ├── search-data.js
│   │   └── visitorCount.js
│   ├── index.js
│   ├── page/
│   │   └── [page].js
│   ├── posts/
│   │   └── [slug].js
│   ├── series/
│   │   └── [seriesSlug].js
│   ├── series.js
│   ├── tags/
│   │   ├── [tag]/
│   │   │   └── page/
│   │   │       └── [pageIndex].js
│   │   └── [tag].js
│   └── tags.js
├── postcss.config.js
├── posts/
├── Project_Structure.md
├── public/
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── google1bc1018399c0d0c7.html
│   ├── images/
│   │   ├── avatar.jpg
│   │   ├── example.png
│   │   ├── header.webp
│   │   └── og-image.jpg
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
├── README.md
├── scripts/
│   └── generate-sitemap.js
├── series/
├── styles/
│   └── globals.css
└── tailwind.config.js
```