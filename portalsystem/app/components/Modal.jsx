"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useModal } from "./ModalContext.jsx";

// eslint-disable-next-line react/display-name
const Modal = forwardRef((props, ref) => {
  const modalRef = useRef();
  const { content, closeModal } = useModal();

  // Expose open/close to parent using ref
  useImperativeHandle(ref, () => ({
    close: () => closeModal(),
  }));

  if (!content) return null;

  return createPortal(
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
        {content}
      </div>
    </div>,
    document.body
  );
});

export default Modal;
