import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../store/userSlice";
import "./Login.css";
function LoginForm() {
  const [formData, setFormData] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let data = { ...formData, rememberMe };
    dispatch(login(data, navigate));
  };
  return (
    <div className="flexRow loginForm flexRowCenter">
      <form onSubmit={onSubmit}>
        <div>
          <h1>Welcome Back !</h1>
          <p>Welcome Back ! Please Enter Your Details</p>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={onFieldChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={onFieldChange}
        />
        <div>
          <span>Don't Have An Account Yet ?</span>
          <span>
            <Link to="/register"> Sign Up</Link>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="flexRow">
            <input
              type={"checkbox"}
              name="rememberMe"
              onChange={() => setRememberMe(!rememberMe)}
              checked={rememberMe}
            />
            <div>Remember Me</div>
          </div>
          <Link to="/Register">Forgot Password</Link>
        </div>
        <button type="submit" onClick={onSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
