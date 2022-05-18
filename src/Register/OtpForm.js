import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../store/userSlice";
import "./Register.css";
import { notificationDispatcher } from "../utilityFunctions";
function OtpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const data = useSelector((state) => state.user);
  const fieldOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validated = (data) => {
    let { otp } = data || {};

    if (!otp || !otp.length) {
      notificationDispatcher(dispatch, {
        message: "OTP is Required",
        status: "Error",
      });
      return false;
    }
    return true;
  };
  const formOnSubmit = (e) => {
    e.preventDefault();
    let { registerUser } = data || {};
    let newFormData = { ...formData, ...registerUser };
    if (validated(formData)) dispatch(register(newFormData,navigate));
  };
  return (
    <div className="flexRow registerForm flexRowCenter">
      <form onSubmit={formOnSubmit}>
        <div>
          <h1>An OTP has been sent to you.</h1>
          <p>
            <sup>*</sup>Please Do Not Refresh or close the Page.
          </p>
          <p>
            <sup>*</sup>OTP is valid only for 3 minutes.
          </p>
          <p>
            <sup>*</sup>New OTP can be generated after 3 minutes.
          </p>
        </div>
        <input
          type="text"
          name="otp"
          placeholder="otp"
          required={true}
          onChange={fieldOnChange}
        />
        <button type="submit" onClick={formOnSubmit}>
          Submit OTP
        </button>
      </form>
    </div>
  );
}

export default OtpForm;
