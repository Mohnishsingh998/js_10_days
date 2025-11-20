"use client";

import { useRef, useState, useEffect } from "react";
import useAutosize from "../hooks/useAutosize";

export default function NotesPanel() {
  const [notes, setNotes] = useState("");
  const taRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("notes") || "";
    setNotes(saved);
  }, []);

  useAutosize(taRef, notes);

  useEffect(() => {
    localStorage.setItem("notes", notes);
  }, [notes]);

  return (
    <div className="panel">
      <h3>Notes</h3>
      <textarea
        ref={taRef}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ width: "100%", resize: "none", padding: 8 }}
      />
    </div>
  );
}
