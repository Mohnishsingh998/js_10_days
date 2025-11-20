"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("incomplete");

  useEffect(() => {
    const saved = localStorage.getItem("sort");
    if (saved) setSort(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("sort", sort);
  }, [sort]);

  return (
    <SearchContext.Provider value={{ query, setQuery, sort, setSort }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);

export default function SearchBar() {
  const { query, setQuery } = useSearch();
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search tasks..."
      style={{ padding: 8 }}
    />
  );
}
