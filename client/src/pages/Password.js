import React, { useState } from "react";
import { CONSTANTS } from "../config/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import "./register.css";

export default function Password() {
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

  const submit = () => {};

  return (
    <div className="signup-css">
      <div className="signup-container">
        <h2>Forget a password</h2>
        <form onSubmit={submit} className="signup-form">
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
          Already know the Password?{" "}
          <Link to={"/"} className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
