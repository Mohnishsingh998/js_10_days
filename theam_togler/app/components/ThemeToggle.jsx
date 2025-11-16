"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // 
  const[theme, setTheme] = useState(
    typeof window != "undefined"
    ? localStorage.getItem("theme") || "light"
    : "light"
  );

  // use effect when we touch the theme
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme);
    localStorage.setItem("theme",theme);
  },[theme]);
  // toggel functio 
  const toggleTheme  = () => {
    setTheme(theme == "light" ? "dark" : "light")
  };
  return (
    <button onClick={toggleTheme} className="btn">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

// Initialize theme from localStorage (recommended)
  // const [theme, setTheme] = useState(
  //   // typeof window !== "undefined"
  //   //   ? localStorage.getItem("theme") || "light"
  //   //   : "light"
  //   "light"
  // );


  // // Update DOM + localStorage whenever theme changes
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // // Toggle between light/dark
  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };
