import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleOnSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    axios
      .post("http://localhost:8080/user/login", {
        username,
        password,
      })
      .then((response) => {
        sessionStorage.authToken = response.data.token;
      })
      .catch((err) => {
        console.log(err);
      });

    if (!sessionStorage.getItem("authToken")) {
      return <div className="">loading!</div>;
    }
    navigate("/home");
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

        <button type="submit" className="login__button">
          Enter
        </button>
      </form>
      <Link to="/signup">Don't have an account? Click here to create one!</Link>
    </div>
  );
}

export default Login;
