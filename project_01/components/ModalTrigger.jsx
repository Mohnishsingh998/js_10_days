"use client";

import { forwardRef, useImperativeHandle } from "react";
import { useModalContext } from "../context/ModalContext";

// eslint-disable-next-line react/display-name
const ModalTrigger = forwardRef((props, ref) => {
  const { openModal, closeModal } = useModalContext();

  useImperativeHandle(ref, () => ({
    open: (content) => openModal(content),
    close: () => closeModal(),
  }));

  return (
    <button onClick={() => openModal(<p>Inline Modal</p>)}>Open Inline Modal</button>
  );
});

export default ModalTrigger;
