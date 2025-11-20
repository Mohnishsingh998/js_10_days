"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../context/ModalContext";

export default function Modal() {
  const { isOpen, content, closeModal } = useModalContext();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--panel)",
          padding: 20,
          borderRadius: 10,
          minWidth: 300
        }}
      >
        {content}
      </div>
    </div>,
    document.body
  );
}
