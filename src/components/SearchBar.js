"use client";

import { useEffect, useState } from "react";

const SearchBar = ({ onSearchChange, debounceMs = 300 }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(query.trim().toLowerCase());
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearchChange, debounceMs]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by title or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none ring-0 transition focus:border-gray-500"
      />
    </div>
  );
};

export default SearchBar;
