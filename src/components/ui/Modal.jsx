import React from "react";

function Modal({ isOpen, handleClick, children }) {
  return (
    <div className={isOpen ? "modal" : "modal-note"}>
      <div className="modal__item">{children}</div>
    </div>
  );
}

export default Modal;
