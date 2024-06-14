import Modal from "../Modal/Modal";

function SuccessModal(props) {
  return (
    <Modal name={props.name} onClose={props.onClose} isOpen={props.isOpen}>
      <h2 className="modal__title">Registration successfully completed!</h2>
      <button
        className="modal__link-button modal__link-button_large"
        onClick={props.openAnotherModal}
        tabIndex="0"
      >
        Sign in
      </button>
    </Modal>
  );
}

export default SuccessModal;
