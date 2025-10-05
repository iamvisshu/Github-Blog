import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter } from "next/router";

// The main Header component remains clean, handling only menu/theme
export default function Header({
  search = "",
  onSearch = () => {},
  onSearchSubmit = () => {},
  searchResults = [],
  clearSearch = () => {}
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const closeMenu = () => {
    setMenuOpen(false);
    clearSearch(); // Clear search field when closing the mobile menu
  };


  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b sticky top-0 z-50 shadow-sm">

      {/* Title */}
      <Link href="/" className="cursor-pointer">
        <h1 className="font-bold text-xl text-teal-500 hover:text-teal-600 transition-colors">
          Vishal&apos;s Blog
        </h1>
      </Link>

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
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-teal-500 transition-colors">About</Link>
          <Link href="/tags" className="hover:text-teal-500 transition-colors">Tags</Link>
          <a
            href="https://github.com/iamvisshu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Desktop Search - Pass all required props */}
        <SearchInput
            search={search}
            onSearch={onSearch}
            onSearchSubmit={onSearchSubmit}
            searchResults={searchResults}
            clearSearch={clearSearch}
        />

        {/* Desktop Theme Switcher */}
        <button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {mounted && (theme === "dark" ? "🌞" : "🌙")}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t flex flex-col gap-3 px-4 py-4 md:hidden animate-slideDown shadow-md z-40">
          <nav className="flex flex-col gap-3">
            <Link href="/" onClick={closeMenu} className="hover:underline">Home</Link>
            <Link href="/about" onClick={closeMenu} className="hover:underline">About</Link>
            <Link href="/tags" onClick={closeMenu} className="hover:underline">Tags</Link>
            <a
              href="https://github.com/iamvisshu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              onClick={closeMenu}
            >
              GitHub
            </a>
          </nav>

          {/* Mobile Search */}
          <SearchInput
            isMobile={true}
            search={search}
            onSearch={onSearch}
            onSearchSubmit={onSearchSubmit}
            searchResults={searchResults}
            clearSearch={clearSearch}
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


// --- STANDALONE SearchInput Component ---
function SearchInput({
    isMobile = false,
    search,
    onSearch,
    onSearchSubmit,
    searchResults,
    clearSearch
}) {
    // FIX 1: We use this state for the input field to prevent Layout re-renders on every keystroke
    const [inputValue, setInputValue] = useState(search);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const router = useRouter();
    const searchContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Sync the local input state when the external 'search' prop changes (e.g., clearSearch)
    useEffect(() => {
        setInputValue(search);
    }, [search]);


    // Handle submission (Enter key or Icon click)
    const handleSubmit = useCallback(() => {
        if (inputValue.length > 0) {
            onSearch(inputValue); // Sync the Layout state with the final search term
            onSearchSubmit(inputValue); // Trigger the filtering
            setHighlightedIndex(-1);

            // Re-focus the input after submission for continuous use
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [inputValue, onSearch, onSearchSubmit]);


    // Handle click outside to clear/close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                clearSearch();
                setInputValue(""); // Also clear the local input state
            }
        };
        // Only attach listener for desktop search
        if (!isMobile) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [clearSearch, isMobile]);

    // Handle keyboard navigation (Arrow keys and Enter)
    const handleKeyDown = (e) => {
        // If results are NOT visible, hitting enter SUBMITS the search
        if (e.key === "Enter" && searchResults.length === 0) {
            e.preventDefault();
            handleSubmit();
            return;
        }

        // Only allow navigation if there are results
        if (searchResults.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(prev =>
                (prev + 1) % searchResults.length
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(prev =>
                (prev - 1 + searchResults.length) % searchResults.length
            );
        } else if (e.key === "Enter" && highlightedIndex !== -1) {
            e.preventDefault();
            // Navigate to the highlighted post
            router.push(`/posts/${searchResults[highlightedIndex].slug}`);
            clearSearch();
            setInputValue(""); // Clear local state after navigation
            setHighlightedIndex(-1);
        }
    };


    return (
        <div
            ref={isMobile ? null : searchContainerRef}
            className={`relative ${isMobile ? 'w-full' : 'w-72'}`}
        >
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 pl-10 border rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-150 shadow-inner"
                    value={inputValue} // Use local state here!
                    // FIX 1: This ONLY updates local state, no global re-render, no focus loss.
                    onChange={(e) => { setInputValue(e.target.value); setHighlightedIndex(-1); }}
                    onKeyDown={handleKeyDown}
                    aria-label="Search posts globally"
                />
                {/* Search icon button */}
                <button
                    onClick={handleSubmit}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-teal-500 transition-colors"
                    aria-label="Submit search"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* --- Search Results Dropdown --- */}
            {searchResults.length > 0 && (
                <div
                    className="absolute z-40 w-full mt-2 bg-white dark:bg-gray-700 rounded-xl shadow-2xl border dark:border-gray-600 max-h-80 overflow-y-auto animate-slideDown"
                >
                    {searchResults.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/posts/${post.slug}`}
                            onClick={() => { clearSearch(); setInputValue(""); setHighlightedIndex(-1); }}
                            // FIX 2: We use a state check AND a hover class.
                            className={`block p-3 border-b dark:border-gray-600 transition-colors cursor-pointer
                                ${index === highlightedIndex
                                ? 'bg-teal-100 dark:bg-teal-600'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                                }`}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            // onMouseLeave REMAINED REMOVED
                        >
                            <p className="font-bold text-black dark:text-white truncate">{post.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-1">{post.snippet}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}