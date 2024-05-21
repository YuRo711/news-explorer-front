import Modal from "../Modal/Modal";

function FormModal(props) {
  return (
    <Modal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      <h2 className="modal__title">{props.title}</h2>
      <form className="modal__form" ref={props.formRef}>
        
        {props.children}

        <button className="modal__submit-button"
          disabled={!props.isButtonActive}
        >
          {props.buttonText}
        </button>

        <p className="modal__alt">
            or <span className="modal__link" onClick={props.openAnotherModal}>
                {props.altText}
            </span>
        </p>
      </form>
    </Modal>
  );
}

export default FormModal;