import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  // POST the credentials to /login
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // grab the values from the form
    const username = event.target.username.value;
    const password = event.target.password.value;

    // send an axios POST request
    const response = await axios.post("http://localhost:8080/user/login", {
      username,
      password,
    });
    sessionStorage.authToken = response.data.token;
    navigate("/home");
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleOnSubmit}>
        <h1 className="login__form-title">Log in to your account</h1>
        <label className="login__label">
          Username:
          <input
            type="text"
            name="username"
            className="login__input"
            autoComplete="off"
          />
        </label>
        <label className="login__label">
          Password:
          <input
            type="password"
            name="password"
            className="login__input"
            autoComplete="off"
          />
        </label>

        {error && <div className="login__message">{error}</div>}

        <button type="submit" className="login__button">
          Enter
        </button>
      </form>
      <Link to="/signup">Don't have an account? Click here to create one!</Link>
    </div>
  );
}

export default Login;
