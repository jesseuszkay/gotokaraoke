import "./Login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../../utils/database";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  function handleOnSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    logInUser(setError, username, password, navigate);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleOnSubmit}>
        <h1 className="login__form-title">Log in to your account</h1>
        <label className="login__label">
          Username:
          <input
            type="text"
            name="username"
            className={
              error ? "login__input login__input--error" : "login__input"
            }
            autoComplete="off"
          />
        </label>
        <label className="login__label">
          Password:
          <input
            type="password"
            name="password"
            className={
              error ? "login__input login__input--error" : "login__input"
            }
            autoComplete="off"
          />
        </label>
        <div
          className={error ? "login__error-text" : "login__error-text--hidden"}
        >
          Incorrect username and/or password.
        </div>
        <button type="submit" className="login__button">
          <span>Enter</span>
        </button>
      </form>
      <Link to="/signup">
        <div className="login__signup-link">
          Don't have an account? Click here to create one!
        </div>
      </Link>
    </div>
  );
}

export default Login;
