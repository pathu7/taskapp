import { useState } from "react";
import { CONSTANTS } from "../config/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChnage = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let formErrors = { ...errors };

    // Validate name
    if (data?.name?.length < 3) {
      formErrors.name = "Name must be at least 3 characters.";
      valid = false;
    } else {
      formErrors.name = "";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      formErrors.email = "Please enter a valid email address.";
      valid = false;
    } else {
      formErrors.email = "";
    }

    // Validate password
    if (data.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      valid = false;
    } else {
      formErrors.password = "";
    }

    // Validate confirm password
    if (data.conpassword !== data.password) {
      formErrors.conpassword = "Passwords do not match.";
      valid = false;
    } else {
      formErrors.confirmPassword = "";
    }

    setErrors(formErrors);
    return valid;
  };

  const submit = (e) => {
    e.preventDefault();

    validateForm();
    const URL_PATH = CONSTANTS.API_URL + "signup";
    // return
    return axios({
      url: URL_PATH,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
      },
      data: data,
    }).then(
      (response) => {
        // console.log(response);
        // console.log(response.data);
        window.location.href = "/";
      },
      (error) => {
        console.log(error);
        // if (error.response.data.error == undefined) {
        //     alert(error.response.data.errors[0].message)
        // } else {

        //     alert(error.response.data.error)
        // }
      }
    );
  };

  return (
    <div className="signup-css">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form onSubmit={submit} className="signup-form">
          <div className="form-group">
            <label htmlFor="lname">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              minLength={3}
              onChange={(e) => {
                handleChnage(e);
              }}
              value={data.name}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => {
                handleChnage(e);
              }}
              value={data.email}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                handleChnage(e);
              }}
              value={data.password}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="conpassword">Confirm Password: </label>
            <input
              type="password"
              id="conpassword"
              name="conpassword"
              onChange={(e) => {
                handleChnage(e);
              }}
              value={data.conpassword}
            />
            {errors.conpassword && (
              <p className="error">{errors.conpassword}</p>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to={"/"} className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
