"use client";

import { useState, useRef, useCallback } from "react";
import { useTask } from "../context/TaskContext";

export default function TaskInput() {
  const [text, setText] = useState("");
  const { add } = useTask();
  const ref = useRef();

  const submit = useCallback(() => {
    if (!text.trim()) return;
    add(text);
    setText("");
    ref.current?.focus();
  }, [text, add]);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add task..."
        style={{ flex: 1, padding: 8 }}
      />
      <button onClick={submit}>Add</button>
    </div>
  );
}

