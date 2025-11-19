"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);

  const openModal = (component) => {
    setContent(component);
  };

  const closeModal = () => {
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ content, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
