"use client";

import { useMemo } from "react";
import { useTask } from "../context/TaskContext";
import { useSearch } from "./SearchBar";

export default function TaskList() {
  const { tasks, toggle, remove } = useTask();
  const { query, sort } = useSearch();

  const filtered = useMemo(() => {
    let list = tasks.filter(t => t.text.toLowerCase().includes(query.toLowerCase()));
    if (sort === "new") list.sort((a, b) => b.id - a.id);
    if (sort === "old") list.sort((a, b) => a.id - b.id);
    if (sort === "incomplete") list.sort((a, b) => Number(a.done) - Number(b.done));
    return list;
  }, [tasks, query, sort]);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {filtered.map((t) => (
        <li key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: 8 }}>
          <span
            style={{
              textDecoration: t.done ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => toggle(t.id)}
          >
            {t.text}
          </span>
          <button onClick={() => remove(t.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
