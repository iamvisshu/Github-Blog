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
│   ├── PostCard.js
│   └── Sidebar.js
├── LICENSE
├── next.config.js
├── package-lock.json
├── package.json
├── pages/
│   ├── _app.js
│   ├── about.js
│   ├── api/
│   │   ├── search-data.js
│   │   └── visitorCount.js
│   ├── index.js
│   ├── page/
│   │   └── [page].js
│   ├── posts/
│   │   └── [slug].js
│   ├── tags/
│   │   ├── [tag]/
│   │   │   └── page/
│   │   │       └── [pageIndex].js
│   │   └── [tag].js
│   └── tags.js
├── postcss.config.js
├── posts/
│   ├── 01SpringBoot.md
│   ├── 02SpringBoot.md
│   ├── hello-world.md
│   ├── PostNumber01.md
│   └── PostNumber02.md
├── Project_Structure.md
├── public/
│   └── images/
│       ├── avatar.jpg
│       ├── example.png
│       ├── favicon.ico
│       └── header.webp
├── README.md
├── styles/
│   └── globals.css
└── tailwind.config.js

```