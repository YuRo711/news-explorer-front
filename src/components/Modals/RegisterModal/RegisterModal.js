import FormModal from "../FormModal/FormModal";

function RegisterModal(props) {
  return (
    <FormModal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
      altText="Sign in"
      title="Sign up"
      buttonText="Sign up"
    >
      <label className="modal__label"><p className="modal__label-text">Email</p>
        <input className="modal__input"
          type="email"
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

      <label className="modal__label"><p className="modal__label-text">Username</p>
        <input className="modal__input"
          type="text"
          id="username"
          placeholder="Enter your username"
        />
      </label>
    </FormModal>
  );
}

export default RegisterModal;