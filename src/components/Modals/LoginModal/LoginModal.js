import { useEffect, useRef, useState } from "react";
import FormModal from "../FormModal/FormModal";
import { formValidator } from "../../../utils/formValidator";

function LoginModal(props) {

  function enableValidation() {
    const formElement = formRef.current;
    const newValidator = new formValidator(formElement, setButtonActivity);
    newValidator.enableValidation();
    setValidator(newValidator);
  }

  function toggleButtonState() {
    validator.toggleButtonState();
  }

  function submit() {
    props.signIn(email, password);
  }


  const [isButtonActive, setButtonActivity] = useState(false);
  const [validator, setValidator] = useState(null);
  const formRef = useRef();
  useEffect(() => {
    enableValidation();
  }, [formRef]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormModal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
      altText="Sign up"
      title="Sign in"
      buttonText="Sign in"
      openAnotherModal={props.openAnotherModal}
      formRef={formRef}
      isButtonActive={isButtonActive}
      onSubmit={submit}
    >
      <label className="modal__label"><p className="modal__label-text">Email</p>
        <input className="modal__input"
          type="text"
          id="login-email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
            toggleButtonState();
          }}
          required
        />
        <p className="modal__error" id="email-error"></p>
      </label>

      <label className="modal__label"><p className="modal__label-text">Password</p>
        <input className="modal__input"
          type="password"
          id="login-password"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
            toggleButtonState();
          }}
          required
        />
        <p className="modal__error" id="password-error"></p>
      </label>
    </FormModal>
  );
}

export default LoginModal;