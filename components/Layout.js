import { useState, useEffect, useMemo } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const HEADER_IMAGE = "/images/header.webp";

export default function Layout({ children }) {
  // search holds the text in the input field
  const [search, setSearch] = useState("");
  // NEW: submittedSearch holds the query that triggers filtering
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [postIndex, setPostIndex] = useState([]);

  // Function to be passed to Header to trigger filtering
  const handleSearchSubmit = (query) => {
    setSubmittedSearch(query);
  };

  // 1. Fetch search data only once on mount (no change here)
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
    if (!submittedSearch || submittedSearch.length < 2) {
      return [];
    }

    const term = submittedSearch.toLowerCase();

    return postIndex
      .filter(post => post.searchableText.includes(term))
      .slice(0, 8);
  }, [submittedSearch, postIndex]); // DEPENDS ON submittedSearch


  return (
    <>
      {/* MODIFIED: Pass both search and the submit handler */}
      <Header
        search={search}
        onSearch={setSearch}
        // NEW: Handler to manually trigger the search
        onSearchSubmit={handleSearchSubmit}
        searchResults={searchResults}
        // MODIFIED: clearSearch now clears both states
        clearSearch={() => { setSearch(""); setSubmittedSearch(""); }}
      />

      <div className="relative w-full h-40 md:h-52 bg-gray-200 dark:bg-gray-900 mb-8">
        <img
          src={HEADER_IMAGE}
          alt="Header"
          className="object-cover w-full h-full rounded-3xl"
        />
      </div>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}