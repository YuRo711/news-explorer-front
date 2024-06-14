import { useEffect, useRef, useState } from "react";
import FormModal from "../FormModal/FormModal";
import { FormValidator } from "../../../utils/FormValidator";

function RegisterModal(props) {

  function enableValidation() {
    const formElement = formRef.current;
    const newValidator = new FormValidator(formElement, setButtonActivity);
    newValidator.enableValidation();
    setValidator(newValidator);
  }

  function toggleButtonState() {
    validator.toggleButtonState();
  }

  function submit() {
    props.registerUser(name, email, password);
  }

  
  const [isButtonActive, setButtonActivity] = useState(false);
  const [validator, setValidator] = useState(null);
  const formRef = useRef();
  useEffect(() => {
    enableValidation();
  }, [formRef]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
      onSubmit={submit}
    >
      <label className="modal__label"><p className="modal__label-text">Email</p>
        <input className="modal__input"
          type="email"
          id="signup-email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
            toggleButtonState();
          }}
          value={email}
          required
        />
        <p className="modal__error" id="signup-email-error"></p>
      </label>

      <label className="modal__label"><p className="modal__label-text">Password</p>
        <input className="modal__input"
          type="password"
          id="signup-password"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
            toggleButtonState();
          }}
          value={password}
          required
        />
        <p className="modal__error" id="signup-password-error"></p>
      </label>

      <label className="modal__label"><p className="modal__label-text">Username</p>
        <input className="modal__input"
          type="text"
          id="signup-username"
          placeholder="Enter your username"
          onChange={(e) => {
            setName(e.target.value);
            toggleButtonState();
          }}
          value={name}
          required
        />
        <p className="modal__error" id="signup-username-error"></p>
      </label>
    </FormModal>
  );
}

export default RegisterModal;