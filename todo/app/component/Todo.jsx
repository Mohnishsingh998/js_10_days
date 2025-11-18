"use client";

import {
  useState,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export default function AdvancedTodo() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const inputRef = useRef(null);
  const listRef = useRef(null);

  // 1️⃣ Auto focus input using useEffect + useRef
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 2️⃣ Debounce search using useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  // 3️⃣ Scroll to bottom BEFORE paint using useLayoutEffect
  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [todos]);

  // 4️⃣ Add todo using useCallback
  const addTodo = useCallback(() => {
    if (input.trim() === "") return;
    dispatch({ type: "ADD", text: input });
    setInput("");
  }, [input]);

  // 5️⃣ Filter + Sort using useMemo
  const filteredTodos = useMemo(() => {
    return todos
      .filter((t) =>
        t.text.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) => Number(a.done) - Number(b.done));
  }, [todos, debouncedSearch]);

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h2>
        1.useState,
        2.useEffect,
        3.useMemo,
        4.useReducer,
        5.useCallback,
        6.useLayoutEffect,
        7.useRef,
        </h2>

      {/* Add Todo Input */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Search Input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      {/* Todo List */}
      <ul
        ref={listRef}
        style={{
          maxHeight: "250px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {filteredTodos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              textDecoration: t.done ? "line-through" : "none",
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => dispatch({ type: "TOGGLE", id: t.id })}
            >
              {t.text}
            </span>
            <button onClick={() => dispatch({ type: "REMOVE", id: t.id })}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// use of all 7 hooks in a Todo app
/* 

here is  the explaination of how each hook is used in the Todo app:

1. useState: This hook is used to manage the state of the input field for adding new todos, the search input, and the debounced search term.

2. useEffect: This hook is used for two purposes:
   - To automatically focus the input field when the component mounts.
   - To implement debouncing for the search input, updating the debounced search term after a delay.
   
3. useMemo: This hook is used to memoize the filtered and sorted list of todos based on the current todos and the debounced search term. This optimization prevents unnecessary recalculations on every render.
4. useReducer: This hook is used to manage the state of the todo list itself. It provides a more structured way to handle complex state updates (adding, toggling, and removing todos) compared to useState.

5. useCallback: This hook is used to memoize the addTodo function, ensuring that it only gets recreated when the input value changes. This optimization can help prevent unnecessary re-renders of child components that might depend on this function.

6. useLayoutEffect: This hook is used to scroll the todo list to the bottom before the browser paints the updated UI whenever a new todo is added. This ensures that the user always sees the most recently added todo.

7. useRef: This hook is used to create references to the input field (for focusing) and the todo list container (for scrolling). These references allow direct manipulation of DOM elements without causing re-renders.

Overall, these hooks work together to create a responsive and efficient Todo app that handles user interactions smoothly.
 */