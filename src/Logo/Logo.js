import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
function Logo(props) {
  return (
    <div className="logoMedium flexRow">
      <Link to="/" className="logoMedium">
        <img src={"/Logo.jpg"} alt='not found'/>
      </Link>
    </div>
  );
}

export default Logo;
