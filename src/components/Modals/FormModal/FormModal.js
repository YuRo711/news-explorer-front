import Modal from "../Modal/Modal";

function FormModal(props) {
  return (
    <Modal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      <h2 className="modal__title">{props.title}</h2>
      <form className="modal__form"
        ref={props.formRef}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        
        {props.children}

        <button className="modal__submit-button"
          disabled={!props.isButtonActive}
        >
          {props.buttonText}
        </button>

        <p className="modal__alt">
            or <button className="modal__link-button"
              onClick={props.openAnotherModal}
              tabIndex="0"
            >
                {props.altText}
            </button>
        </p>
      </form>
    </Modal>
  );
}

export default FormModal;