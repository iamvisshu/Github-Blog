# 🚀 Github-Blog by @iamvisshu

**A modern, fully responsive Next.js blog template engineered for speed, rich metadata, and stable content rendering.**

This template transforms simple Markdown files into a high-performance, SEO-friendly static blog, perfectly optimized for deployment on Vercel.

<br>

---

## ✨ Key Features (till v2.0.0-beta)

We have significantly enhanced the core features from the initial alpha release.

### 📝 Content & Data

| Icon   | Feature                       | Description                                                                                                                           |
|:-------|:------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------|
| **⏱️** | **Rich Content Metadata**     | Automatically calculates and displays **Estimated Reading Time** and **Word Count** on both post listings and single post pages.      |
| **🔍** | **Stable Global Search**      | Fully functional and fast client-side search allows users to instantly filter and navigate posts by title from any page.              |
| **📄** | **Pagination Support**        | Seamless navigation across a large number of posts with dynamic page numbering on the home page.                                      |
| **🔗** | **Enhanced Navigation**       | Implemented **Next/Previous Post** links on single post pages for improved reader flow.                                               |
| **✅**  | **Robust Markdown Rendering** | Full support for complex Markdown elements, including properly styled tables with horizontal scrolling, blockquotes, and code blocks. |

### 🎨 Design & UI/UX

| Icon    | Feature                 | Description                                                                                                     |
|:--------|:------------------------|:----------------------------------------------------------------------------------------------------------------|
| **📱**  | **Full Responsiveness** | Flawless display and functionality across all devices (mobile, tablet, desktop) with optimized layout.          |
| **🌗**  | **Modern Theming**      | Elegant Dark/Light mode toggle with professional header polish, including custom hover effects and clean icons. |
| **🏷️** | **Dynamic Tagging**     | Tags are auto-collected, displayed with icons on post tiles, and fully linked to filter posts by topic.         |
| **💡**  | **Clean Aesthetic**     | Uses Tailwind CSS for a minimalist, modern aesthetic and modular, easy-to-customize components.                 |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Content:** Markdown (`.md`) with front-matter
- **Utilities:** `gray-matter`, `remark`, `next-themes`

---

## 🚀 Getting Started

1. **Clone the repository:**

    ```
    git clone https://github.com/iamvisshu/Github-Blog.git
    cd github-blog
    ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Start local development:**

    ```
    npm run dev
    ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**

    ```
    npm run build
    npm start
    ```

5. **Add blog posts:**

    - Place `.md` files in the `/posts` folder.
    - Example front-matter for a post:

      ```
      ---
      title: "Hello World"
      date: "2025-10-04"
      tags: [Examples, Guides]
      summary: "Your introduction text here"
      cover: "/images/example.png"
      ---
      Post content goes here...
      ```

---

## ☁️ Deployment

- Push your repository to GitHub.
- Connect your repo to [Vercel](https://vercel.com/).
- Vercel will automatically deploy your blog and rebuild it on every push.

---

## 🙏 Credits

Created and maintained by [@iamvisshu (Vishal Vishwakarma)](https://github.com/iamvisshu)

- Portfolio: [iamvisshu.github.io](https://iamvisshu.github.io)
- LinkedIn: [in/iamvisshu](https://linkedin.com/in/iamvisshu)

---

## ⚖️ License

This Project is developed under MIT License.

