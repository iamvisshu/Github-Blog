import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { BadgeCheck } from 'lucide-react';

export default function About() {
  return (
  <>
  <Head>
    <title>About @iamvisshu aka Vishal Vishwakarma</title>
    <meta
      name="description"
      content="@iamvisshu aka Vishal Vishwakarma, is a Senior Software Developer with a comprehensive professional IT experience of over five years in software development and coding."
    />
    <link rel="canonical" href="https://vishalsblog.vercel.app/about" />
    {/* Open Graph meta for link previews */}
    <meta property="og:title" content="Vishal's Blog - Learn and Explore Java Programming" />
    <meta property="og:description" content="Explore tutorials, guides, and Java programming examples on Vishal's Blog." />
    <meta property="og:image" content="https://vishalsblog.vercel.app/images/og-image.jpg" />
    <meta property="og:url" content="https://vishalsblog.vercel.app" />
    <meta property="og:type" content="website" />

    {/* Twitter Card for large image preview */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Vishal's Blog - Learn and Explore Java Programming" />
    <meta name="twitter:description" content="Explore tutorials, guides, and Java programming examples on Vishal's Blog." />
    <meta name="twitter:image" content="https://vishalsblog.vercel.app/images/og-image.jpg" />
    <meta property="twitter:domain" content="vishalsblog.vercel.app" />
    <meta property="twitter:url" content="https://vishalsblog.vercel.app/" />
  </Head>
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Title: About Me */}
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
        About Me
      </h1>

      {/* Section 1: Personal and Core Expertise */}
      <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg border-t-4 border-teal-500">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex flex-wrap items-center">
            <span className="whitespace-nowrap">
                <span role="img" aria-label="Rocket">🚀</span> Vishal Vishwakarma
            </span>
            <span className="flex items-center gap-2">
                (@iamvisshu)
                <BadgeCheck
                    className="w-5 h-5 text-white fill-blue-500 dark:fill-blue-400"
                    strokeWidth={2.5}
                />
            </span>
          </h2>
          <div className="mb-3"></div>

        <p className="mb-3 text-lg text-gray-700 dark:text-gray-300">
          I am a <strong>Senior Software Developer</strong> driven by a passion for creating <strong>robust and scalable</strong> solutions. My primary focus areas include <strong>Java</strong> development with <strong>SpringBoot</strong> for enterprise backends and <strong>Next.js/React</strong> for high-performance frontend architecture.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This blog is where I distill over five years of professional experience into actionable tutorials and insights.
        </p>
      </div>

      {/* Section 2: Blog's Technical Focus */}
      <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg border-t-4 border-teal-500">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
          <span role="img" aria-label="Code">💻</span> Deep Dives & Tech Focus
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>Backend Excellence:</strong> Comprehensive guides on Java, Spring Boot, Microservices, and architectural best practices.</li>
          <li><strong>Frontend Performance:</strong> Exploring modern Next.js, React, and TypeScript for state-of-the-art web applications.</li>
          <li><strong>Innovation:</strong> Insights into Generative AI integration and leveraging LLMs in development workflows.</li>
        </ul>
      </div>

      {/* Section 3: Call to Action and Tech Stack */}
      <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg border-t-4 border-teal-500">
        <p className="mb-3 text-xl font-medium text-gray-800 dark:text-white">
          🌐 <strong>The Platform:</strong> Engineered with <strong>Next.js</strong> and powered by <strong>Markdown</strong> files for speed, performance, and a smooth reading experience.
        </p>
        <p className="mb-5 text-lg text-gray-700 dark:text-gray-400">
          Feel free to explore the posts and connect with me to discuss the latest in software architecture.
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <a
            href="https://github.com/iamvisshu"
            // Use w-full on small screens to make it a block element
            className="w-full text-lg font-bold text-white bg-teal-500 hover:bg-teal-600 px-5 py-3 rounded-lg transition duration-300 shadow-md transform hover:scale-105 flex items-center justify-center md:w-auto md:py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span role="img" aria-label="GitHub" className="mr-2">⭐</span> Connect on GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/iamvisshu"
            // Use w-full on small screens to make it a block element
            className="w-full text-lg font-bold text-teal-500 border-2 border-teal-500 hover:bg-teal-50 dark:hover:bg-gray-700 px-5 py-3 rounded-lg transition duration-300 shadow-md transform hover:scale-105 flex items-center justify-center md:w-auto md:py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span role="img" aria-label="LinkedIn" className="mr-2">♥️</span> Find Me on LinkedIn
          </a>
        </div>
      </div>
    </div>
    </>
  );
}