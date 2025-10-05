import { useState } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const HEADER_IMAGE = "/images/header.webp";

export default function Layout({ children }) {
  const [search, setSearch] = useState("");
  return (
    <>
      <Header search={search} onSearch={setSearch} />
      <div className="relative w-full h-40 md:h-52 bg-gray-200 dark:bg-gray-900 mb-8">
        <img
          src={HEADER_IMAGE}
          alt="Header"
          className="object-cover w-full h-full rounded-b-3xl"
        />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
