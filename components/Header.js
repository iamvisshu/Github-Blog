import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header({ search = "", onSearch = () => {} }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="flex items-center gap-6 px-6 py-4 bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
      <h1 className="font-bold text-xl text-teal-500">Vishal's Blog</h1>
      <nav className="flex gap-6 flex-1">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/tags">Tags</Link>
        <a
          href="https://github.com/iamvisshu"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
      </nav>
      <input
        type="text"
        placeholder="Search..."
        className="ml-auto p-2 border rounded dark:bg-gray-800 dark:text-white"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <button
        className="ml-4 border rounded p-2"
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
      >
        {mounted && (theme === "dark" ? "🌞" : "🌙")}
      </button>
    </header>
  );
}
