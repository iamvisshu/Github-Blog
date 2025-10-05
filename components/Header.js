import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icon set

export default function Header({ search = "", onSearch = () => {} }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b sticky top-0 z-50 shadow-sm">
      {/* Title */}
      <h1 className="font-bold text-xl text-teal-500">Vishal&apos;s Blog</h1>

      {/* Hamburger (visible on mobile) */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/tags" className="hover:underline">Tags</Link>
          <a
            href="https://github.com/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </nav>

        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search posts"
        />

        <button
          className="ml-2 border rounded p-2"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {mounted && (theme === "dark" ? "🌞" : "🌙")}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t flex flex-col gap-3 px-4 py-4 md:hidden animate-slideDown shadow-md">
          <nav className="flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:underline">Home</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:underline">About</Link>
            <Link href="/tags" onClick={() => setMenuOpen(false)} className="hover:underline">Tags</Link>
            <a
              href="https://github.com/iamvisshu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              GitHub
            </a>
          </nav>

          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search posts"
          />

          <button
            className="border rounded p-2 w-fit"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {mounted && (theme === "dark" ? "🌞" : "🌙")}
          </button>
        </div>
      )}
    </header>
  );
}
