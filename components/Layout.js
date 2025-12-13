import { useState, useEffect, useMemo } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";

const HEADER_IMAGE = "/images/header.webp";

export default function Layout({ children }) {
  // search holds the text in the input field
  const [search, setSearch] = useState("");
  // submittedSearch holds the query that triggers filtering
  const [submittedSearch, setSubmittedSearch] = useState("");
  // NEW: Tracks if a search action (Enter/Button click) has occurred
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [postIndex, setPostIndex] = useState([]);

  // Function to be passed to Header to trigger filtering
  const handleSearchSubmit = (query) => {
    setSubmittedSearch(query);
    setSearchPerformed(true); // Set this flag on submit
  };

  // 1. Fetch search data only once on mount
  useEffect(() => {
    async function fetchSearchIndex() {
      try {
        const res = await fetch('/api/search-data');
        const data = await res.json();
        setPostIndex(data);
      } catch (error) {
        console.error("Could not fetch search index:", error);
      }
    }
    fetchSearchIndex();
  }, []);

  // 2. Filter posts based on the SUBMITTED search term
  const searchResults = useMemo(() => {
    // Only search if a query has been submitted AND it's long enough
    if (!submittedSearch || submittedSearch.length < 2) {
      return [];
    }

    const term = submittedSearch.toLowerCase();

    // Assuming postIndex items have a searchableText field (you might need to adjust this filter logic if your posts are filtered differently)
    return postIndex
      .filter(post => post.searchableText.includes(term))
      .slice(0, 8);
  }, [submittedSearch, postIndex]);


  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        onSearchSubmit={handleSearchSubmit}
        searchResults={searchResults}
        // NEW PROP PASSED DOWN
        searchPerformed={searchPerformed}

        // MODIFIED: clearSearch now clears searchPerformed as well
        clearSearch={() => {
          setSearch("");
          setSubmittedSearch("");
          setSearchPerformed(false); // Clear this flag too
        }}
      />
      <div className="relative w-full h-40 md:h-52 bg-gray-200 dark:bg-gray-900 flex">
        <Image
          src={HEADER_IMAGE}
          alt="Header"
          width={721}
          height={481}
          className="object-cover w-full h-full rounded-3xl"
          priority
        />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}