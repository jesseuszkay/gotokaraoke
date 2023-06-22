import "./SignUp.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  // POST the credentials to /signup
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // grab the values from the form
    const username = event.target.username.value;
    const password = event.target.password.value;

    // send an axios POST request
    const response = await axios.post("http://localhost:8080/user/signup", {
      username,
      password,
    });
    navigate("/login");
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
            className="signup__input"
            autoComplete="off"
          />
        </label>
        <label className="signup__label">
          Password:
          <input
            type="password"
            name="password"
            className="signup__input"
            autoComplete="off"
          />
        </label>

        {error && <div className="signup__message">{error}</div>}

        <button type="submit" className="signup__button">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
