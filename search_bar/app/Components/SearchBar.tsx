"use client";

import { useState, useRef, useEffect, useMemo } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const users = [
    "Mohnish","Sahil","Rohit","Aman","Ankit",
    "Mohit","Rahul","Sumit","Sandeep","Vikram",
  ];

  // Filtered list
  // useMemo -- > used with the dependency array to memoize the vale as the dependency changes for the particular value
// like here we use ffilerteduser function in which ewe filrwe based o nthe currect value of the user in the palce holder user.filer((u) => u.tolowercase().incluedes(search.toLoowercase())
  const filteredUsers = useMemo(() => {
    return users.filter((u) => u.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  // Auto focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "300px",
        margin: "20px auto",
        position: "relative",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true); // Open dropdown when typing
        }}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        onClick={() => setOpen(true)}
      />

      {open && filteredUsers.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "100%",
            background: "white",
            listStyle: "none",
            padding: 0,
            marginTop: "5px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            maxHeight: "180px",
            overflowY: "auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 20,
          }}
        >
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              onClick={() => {
                setSearch(user);
                setOpen(false);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onMouseOver={(e) => ((e.target as HTMLElement).style.background = "gray")}
              onMouseOut={(e) => ((e.target as HTMLElement).style.background = "black")}
            >
              {user}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
