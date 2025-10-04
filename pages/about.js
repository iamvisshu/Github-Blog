import React from "react";
import Layout from "../components/Layout";

export default function About() {
  return (

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-6 text-teal-500">About Me</h1>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          Welcome to my blog! I'm Vishal Vishwakarma (<code>@iamvisshu</code>), a passionate software developer focused on Java and JavaScript technologies.
        </p>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          This blog is powered by Next.js and Markdown files, allowing me to write and share tutorials, guides, and insights about software development, programming concepts, and industry trends.
        </p>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          Feel free to explore the posts, and connect with me on <a href="https://github.com/iamvisshu" className="text-teal-500 underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          Thank you for visiting my blog. I hope you find the content helpful and inspiring!
        </p>
      </div>

  );
}
