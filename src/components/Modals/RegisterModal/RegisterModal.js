import { useEffect, useRef, useState } from "react";
import FormModal from "../FormModal/FormModal";
import { formValidator } from "../../../utils/formValidator";

function RegisterModal(props) {

  function enableValidation() {
    const formElement = formRef.current;
    const newValidator = new formValidator(formElement, setButtonActivity);
    newValidator.enableValidation();
    setValidator(newValidator);
  }

  function toggleButtonState() {
    validator.toggleButtonState();
  }

  const [isButtonActive, setButtonActivity] = useState(false);
  const [validator, setValidator] = useState(null);
  const formRef = useRef();
  useEffect(() => {
    enableValidation();
  }, [formRef])

  return (
    <FormModal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
      altText="Sign in"
      title="Sign up"
      buttonText="Sign up"
      openAnotherModal={props.openAnotherModal}
      formRef={formRef}
      isButtonActive={isButtonActive}
    >
      <label className="modal__label"><p className="modal__label-text">Email</p>
        <input className="modal__input"
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={toggleButtonState}
          required
        />
        <p className="modal__error" id="email-error"></p>
      </label>

      <label className="modal__label"><p className="modal__label-text">Password</p>
        <input className="modal__input"
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={toggleButtonState}
          required
        />
        <p className="modal__error" id="password-error"></p>
      </label>

      <label className="modal__label"><p className="modal__label-text">Username</p>
        <input className="modal__input"
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={toggleButtonState}
          required
        />
        <p className="modal__error" id="username-error"></p>
      </label>
    </FormModal>
  );
}

export default RegisterModal;