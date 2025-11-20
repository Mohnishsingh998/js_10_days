"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

const TaskContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload || [];
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case "TOGGLE":
      return state.map(t => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "REMOVE":
      return state.filter(t => t.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) dispatch({ type: "INIT", payload: JSON.parse(stored) });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        add: text => dispatch({ type: "ADD", payload: text }),
        toggle: id => dispatch({ type: "TOGGLE", id }),
        remove: id => dispatch({ type: "REMOVE", id }),
        clearAll: () => dispatch({ type: "CLEAR" })
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);
