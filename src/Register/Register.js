import React from "react";
import "./Register.css";
import RegistrationForm from "./RegistrationForm";
import Testimonial from "./Testimonial";
function Register() {
  return (
    <div className="registerPage">
      <RegistrationForm />
      <Testimonial/>
    </div>
  );
}

export default Register;
