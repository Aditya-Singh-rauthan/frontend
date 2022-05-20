import React from "react";
import "./modal.css";
function Modal(props) {
  return (
    <div className="ModalContainer">
      <div className="Modal">{props.children || "Modal"}</div>
    </div>
  );
}

export default Modal;
