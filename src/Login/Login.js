import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
function Login() {
  return (
    <div className="loginPage">
      <LoginForm />
      <div className="flexRow loginImage"></div>
    </div>
  );
}

export default Login;
