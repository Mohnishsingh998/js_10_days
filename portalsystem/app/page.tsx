"use client";

import { useRef } from "react";
import { useModal } from "./components/ModalContext";

export default function Page() {
  const modal = useRef();
  const { openModal } = useModal();

  const openInfoModal = () => {
    openModal(
      <>
        <h2>Hello from Modal!</h2>
        <p>This modal uses Portal + Context + forwardRef!</p>
        <button onClick={() => modal.current.Close()}>Close</button>
      </>
    );
  };

  return (
    <main style={{ padding: "50px" }}>
      <h1>Next.js Portal Modal</h1>

      <button
        onClick={openInfoModal}
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Open Modal
      </button>
    </main>
  );
}
