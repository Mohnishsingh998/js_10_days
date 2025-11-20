"use client";

import { useSearch } from "./SearchBar";

export default function SortingButtons() {
  const { sort, setSort } = useSearch();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => setSort("incomplete")} style={{ fontWeight: sort === "incomplete" ? "700" : "400" }}>
        Incomplete
      </button>
      <button onClick={() => setSort("new")} style={{ fontWeight: sort === "new" ? "700" : "400" }}>
        New
      </button>
      <button onClick={() => setSort("old")} style={{ fontWeight: sort === "old" ? "700" : "400" }}>
        Old
      </button>
    </div>
  );
}
