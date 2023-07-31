import "./SignUp.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserDetails } from "../../utils/database";

function SignUp() {
  const [signUpError, setSignUpError] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setSignUpError(false);

    const username = event.target.username.value;
    const password = event.target.password.value;

    createUserDetails(setSignUpError, username, password, navigate);
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleOnSubmit}>
        <h1 className="signup__form-title">Sign up for your account</h1>
        <label className="signup__label">
          Username:
          <input
            type="text"
            name="username"
            className={
              signUpError
                ? "signup__input signup__input--error"
                : "signup__input"
            }
            autoComplete="off"
          />
        </label>
        <label className="signup__label">
          Password:
          <input
            type="password"
            name="password"
            className={
              signUpError
                ? "signup__input signup__input--error"
                : "signup__input"
            }
            autoComplete="off"
          />
        </label>
        {signUpError && (
          <div className="signup__error-message">
            This username is already taken. Please choose a different one.
          </div>
        )}
        <button type="submit" className="signup__button">
          <span className="signup__button-text"> Create Account</span>
        </button>
      </form>
    </div>
  );
}

export default SignUp;
