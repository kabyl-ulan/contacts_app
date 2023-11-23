import React from "react";

function Modal({ isOpen, handleClick, children }) {
  const notOnClose = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={isOpen ? "modal" : "modal-note"} onClick={handleClick}>
      <div className="modal__item" onClick={notOnClose}>
        <div className="modal__item__icon" onClick={handleClick}>
          ✕
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
