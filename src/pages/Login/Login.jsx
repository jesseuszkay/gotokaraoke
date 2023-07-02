import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ apiURL }) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  function handleOnSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    axios
      .post(apiURL + "/user/login", {
        username,
        password,
      })
      .then((response) => {
        sessionStorage.authToken = response.data.token;
        navigate("/home");
      })
      .catch((err) => {
        setError(true);
      });
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
          Enter
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
