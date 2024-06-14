import { useEffect } from "react";
import "./Modal.css";

function Modal(props) {
  const { onClose, name, isOpen } = props;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose(name);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, name]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose(name);
    }
  };

  return (
    <div
      className={isOpen ? `modal modal_opened` : `modal`}
      id={name}
      onClick={handleOverlay}
    >
      <div className={`modal__container`}>
        {props.children}

        <div
          className="modal__close-button"
          type="button"
          onClick={() => {
            onClose(name);
          }}
        />
      </div>
    </div>
  );
}

export default Modal;
