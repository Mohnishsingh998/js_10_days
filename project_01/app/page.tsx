"use client";

import { useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTask } from "../context/TaskContext";

import ModalTrigger from "../components/ModalTrigger";
import NotesPanel from "../components/NotesPanel";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

import SearchBar, { SearchProvider } from "../components/SearchBar";
import SortingButtons from "../components/SortingButtons";

export default function Page() {
  const { theme, toggleTheme } = useTheme();
  const { clearAll } = useTask();
  const modal = useRef();

  const openHelp = useCallback(() => {
    modal.current.open(
      <>
        <h2>Help</h2>
        <p>This app demonstrates: useState, useEffect, useContext, useReducer, useMemo, useRef, useLayoutEffect, useCallback, forwardRef, useImperativeHandle.</p>
        <button onClick={() => modal.current.close()}>Close</button>
      </>
    );
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <h1>Productivity Dashboard</h1>

        <button onClick={toggleTheme} style={{ marginLeft: "auto" }}>
          Toggle Theme ({theme})
        </button>

        <button onClick={openHelp}>Help</button>
        <button onClick={clearAll}>Clear Tasks</button>
      </header>

      <SearchProvider>
        <section style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <SearchBar />
              <SortingButtons />
            </div>

            <TaskInput />
            <TaskList />
          </div>

          <aside>
            <NotesPanel />
            <ModalTrigger ref={modal} />
          </aside>
        </section>
      </SearchProvider>
    </main>
  );
}
