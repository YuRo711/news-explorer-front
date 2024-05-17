import FormModal from "../FormModal/FormModal";

function LoginModal(props) {
  return (
    <FormModal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
      altText="Sign up"
      title="Sign in"
      buttonText="Sign in"
      openAnotherModal={props.openAnotherModal}
    >
      <label className="modal__label"><p className="modal__label-text">Email</p>
        <input className="modal__input"
          type="text"
          id="email"
          placeholder="Enter email"
        />
      </label>

      <label className="modal__label"><p className="modal__label-text">Password</p>
        <input className="modal__input"
          type="password"
          id="password"
          placeholder="Enter password"
        />
      </label>
    </FormModal>
  );
}

export default LoginModal;