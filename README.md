# Github-Blog

A minimal, modern Next.js blog powered by Markdown files.

Created by [@iamvisshu](https://github.com/iamvisshu) (Vishal Vishwakarma)

---

## Overview

**Github-Blog** is a simple yet flexible static blog built with [Next.js](https://nextjs.org/) and Markdown. Write your posts in the `/posts` directory using Markdown with front-matter metadata and let the app handle dynamic routing and rendering. This project is designed for fast setup, easy content management via GitHub, and seamless deployment to [Vercel](https://vercel.com/).

---

## Features

- **Write in Markdown:** Author posts using Markdown in `/posts`. Supports front-matter (title, date, tags, summary, image).
- **Automatic Routing:** Markdown files are automatically converted into blog posts and pages.
- **Fast & SEO-Friendly:** Next.js ensures your blog is fast and gets great search rankings.
- **Modern UI:** Includes a responsive header, sidebar, and theme switcher.
- **Search & Tag Filtering:** Instantly filter posts by title or tags.
- **One-Click Deployment:** Deploy to Vercel easily, with continuous deployment on GitHub push.
- **Developer Friendly:** Uses Tailwind CSS, modular components, and simple folder structure for easy extension.

---

## Getting Started

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

## Deployment

- Push your repository to GitHub.
- Connect your repo to [Vercel](https://vercel.com/).
- Vercel will automatically deploy your blog and rebuild it on every push.

---

## Credits

Created and maintained by [@iamvisshu (Vishal Vishwakarma)](https://github.com/iamvisshu)

- Portfolio: [iamvisshu.github.io](https://iamvisshu.github.io)
- LinkedIn: [in/iamvisshu](https://linkedin.com/in/iamvisshu)

---

## License

This Project is developed under MIT License.

