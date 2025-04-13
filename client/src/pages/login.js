import { useState, useContext } from "react";
import { CONSTANTS } from "../config/Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let formErrors = { ...errors };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      formErrors.email = "Please enter a valid email address.";
      valid = false;
    } else {
      formErrors.email = "";
    }

    // Validate password
    if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      valid = false;
    } else {
      formErrors.password = "";
    }

    setErrors(formErrors);
    return valid;
  };

  const submit = (e) => {
    // window.location.href = '/'
    e.preventDefault();
    validateForm();
    console.log(email, password);
    const URL_PATH = CONSTANTS.API_URL + "login";
    let body = {
      email: email,
      password: password,
    };
    // return

    return axios({
      url: URL_PATH,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body,
    }).then(
      (response) => {
        login({
          Token: response.data.token,
          UserId: response.data.ID,
          Email: response.data.Email,
        });
        window.location.href = "/";
      },
      (error) => {
        console.log(error);
        alert(error.response.data.message);
      }
    );
  };
  return (
    <div className="login-css">
      <form onSubmit={submit} className="form-container">
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <br />
        <br />
        <button type="submit">Submit</button>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={"/forgetpassword"} className="forget-link">
            forget Password
          </Link>
        </div>
        <Link to={"/Create"} className="create-account-link">
          <button className="btn btn-info" type="button">Create You Account</button>
        </Link>
      </form>
    </div>
  );
}
