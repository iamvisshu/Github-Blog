# 🚀 Github-Blog by @iamvisshu

**A high-performance, developer-first Next.js blog engine designed for deep technical storytelling and automated content discovery.**

Github-Blog is a complete ecosystem optimized for long-form technical series, AI-assisted reading, and professional developer portability. It transforms simple Markdown into a premium, interactive reading experience.

<br>

---

## ✨ Key Features

This platform combines modern blog essentials with industrial-grade technical features.

### 📚 Structured Learning: The Series System
- **Multi-Part Series Support**: Link related posts into cohesive learning paths.
- **Series Hub**: Dedicated index and detail pages to explore specific technical tracks.
- **Smart Progress Tracking**: Automatic "Part X of Y" indicators and intelligent series-aware navigation.
- **Zero-Code Management**: Configure series metadata (icons, descriptions, order) entirely via Markdown.

### 🔍 Content Discovery & Metadata
- **Global Instant Search**: Lightning-fast client-side search to filter posts by title in real-time.
- **Rich Content Metadata**: Automatically calculated **Reading Time** and **Word Count** for every post.
- **Dynamic Tagging Engine**: Deeply integrated tags with "Show More/Less" functionality and dedicated tag archives.
- **AI Discovery (LLMS.txt)**: Dedicated machine-readable summaries for AI agents and LLM crawlers.

### 🛠 Elite Developer Experience (DX)
- **High-Performance Highlighting**: Build-time syntax highlighting (Atom One Dark) with no client-side overhead.
- **Interactive Code Blocks**: Persistent "Copy" buttons with mobile-optimized overflow handling.
- **Glassmorphic Navigation**: A floating **ScrollNav** for instant Top/Bottom jumps on long articles.
- **Sliding Window Pagination**: Intelligent, responsive pagination for handling large content volumes.

### 🎨 Visuals & UX
- **Modern Theming**: Elegant Dark/Light/System mode toggle with optimized high-contrast colors.
- **Premium Aesthetics**: Glassmorphic UI elements, smooth CSS animations, and pixel-perfect typography calibration.
- **Fully Responsive**: Flawless experience across mobile, tablet, and desktop devices.
- **Custom 404 Page**: Branded error handling to keep users within the blog ecosystem.

### 🤖 SEO & Analytics Mastery
- **Build-Time Generation**: Automated generation of `sitemap.xml` and `feed.xml` (RSS) on every build.
- **Structured Data (JSON-LD)**: Injected Article Schema for rich search snippets and improved indexing.
- **Performance Monitoring**: Pre-integrated Vercel Analytics and Speed Insights for real-time metrics.
- **Universal Favicon Support**: Comprehensive set of PNG icons for Google Search results and cross-platform bookmarks.

---

## 🏗 Project Architecture

```text
📦 Github-Blog
├── 📂 components/     # Tactical UI (Glassmorphic, Sidebar, Nav, Series Cards)
├── 📂 lib/            # Backend logic (Series utilities, Slug parsing, Date sorting)
├── 📂 pages/          # Next.js Routes (Series, Tags, Search, RSS, Posts)
├── 📂 posts/          # Your high-quality content (.md files)
├── 📂 series/         # Series definitions (Icons, Description, Order)
├── 📂 public/         # Optimized assets, Favicons, and generated XML files
└── 📂 scripts/        # Build-time automations (Sitemap & RSS generation)
```

---

## 📖 How to: Create a Series

1.  **Define the Series**: Create `/series/mastering-java.md`:
    ```markdown
    ---
    title: "Mastering Java"
    description: "Deep dive into enterprise Java development."
    icon: "Code"
    order: 1
    ---
    ```
2.  **Tag Your Posts**: Add the metadata to your post's front-matter:
    ```yaml
    ---
    title: "Understanding JVM"
    series: "Mastering Java"
    part: 1
    tags: [Java, Backend]
    ---
    ```

---

## 🛠️ Tech Stack & Tooling

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js (Pages Router) + React 18 |
| **Styling** | Tailwind CSS + CSS Glassmorphism |
| **Markdown** | Remark + Rehype + GFM |
| **Analytics** | Vercel Analytics & Speed Insights |
| **SEO** | JSON-LD, Sitemap-gen, RSS-gen |
| **Theming** | Next-Themes (Dark/Light/System) |

---

## 🚀 Getting Started

1.  **Setup Environment**:
    ```bash
    git clone https://github.com/iamvisshu/Github-Blog.git
    cd Github-Blog
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start local development**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

4.  **Build for production**:
    ```bash
    npm run build
    npm start
    ```

---

## ☁️ Deployment

- Push your changes to GitHub.
- Connect your repository to [Vercel](https://vercel.com/).
- The project will automatically build, generate the sitemap/RSS, and deploy.

---

## 🚀 Release History

- **v3.1.0-release**: Premium UI elements (ScrollNav), Series Indexing, and AI-Ready configs.
- **v3.0.0-release**: Refined UX, internal XML generators, and theme stabilization.
- **v3.0.0-gama**: Core Multi-Part Series System & Mobile Polish.
- **v2.0.0-beta**: Reading Time, Word Count, Search, and Tagging Engine.
- **v1.0.0-alpha**: Initial foundation including Markdown support, dynamic routing, static export, and Vercel deployment.

---

## 🙏 Credits

Developed and maintained with passion by **[@iamvisshu (Vishal Vishwakarma)](https://github.com/iamvisshu)**.

- **Live Site:** [vishalsblog.vercel.app](https://vishalsblog.vercel.app)
- **LinkedIn:** [in/iamvisshu](https://linkedin.com/in/iamvisshu)

---

## ⚖️ License

This Project is developed under MIT License © [iamvisshu](https://github.com/iamvisshu)
