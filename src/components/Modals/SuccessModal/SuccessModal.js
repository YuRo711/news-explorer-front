import Modal from "../Modal/Modal";

function SuccessModal(props) {
  return (
    <Modal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
    >
      <h2 className="modal__title">Registration successfully completed!</h2>
      <p className="modal__link modal__link_large"
        onClick={props.openAnotherModal}
      >
        Sign in
      </p>
    </Modal>
  );
}

export default SuccessModal;