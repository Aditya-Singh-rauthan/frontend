import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOTP } from "../store/userSlice";
import "./Register.css";
import { notificationDispatcher, validateEmail } from "../utilityFunctions";
import OtpForm from "./OtpForm";
function RegistrationForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  let otpData = useSelector((state) => state.user);
  const fieldOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validated = (data) => {
    let { name, email, password, password1 } = data || {};

    if (!name || !name.length) {
      notificationDispatcher(dispatch, {
        message: "Name is Required",
        status: "Error",
      });
      return false;
    }
    if (!email || !email.length) {
      notificationDispatcher(dispatch, {
        message: "Email is Required",
        status: "Error",
      });
      return false;
    }
    if (!validateEmail(email)) {
      notificationDispatcher(dispatch, {
        message: "Invalid Email Format!!",
        status: "Error",
      });
      return false;
    }
    if (!password || !password.length || !password1 || !password1.length) {
      notificationDispatcher(dispatch, {
        message: "Password Fields are required!!!",
        status: "Error",
      });
      return false;
    }
    if (password !== password1) {
      notificationDispatcher(dispatch, {
        message: "Passwords Do Not Match!!!",
        status: "Error",
      });
      return false;
    }
    return true;
  };
  const formOnSubmit = (e) => {
    e.preventDefault();
    if (validated(formData)) dispatch(fetchOTP(formData));
  };
  if (otpData.otpSent) {
    return <OtpForm />;
  }
  return (
    <div className="flexRow registerForm flexRowCenter">
      <form onSubmit={formOnSubmit}>
        <div>
          <h1>Welcome !!!</h1>
          <p>Welcome ! Please Fill the Details Form.</p>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required={true}
          onChange={fieldOnChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          onChange={fieldOnChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          onChange={fieldOnChange}
        />
        <input
          type="password"
          name="password1"
          placeholder="Confirm Password"
          required={true}
          onChange={fieldOnChange}
        />
        <div>
          <span>Already Have An Account ?</span>
          <span>
            <Link to="/login"> Login</Link>
          </span>
        </div>
        <button type="submit" onClick={formOnSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
