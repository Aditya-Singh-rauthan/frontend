import React from "react";
import Logo from "../Logo/Logo";
import '../Landing/LandingPage.css'
import { Link } from "react-router-dom";
function LandingHeader() {
  return (
    <div className="landingHeader">
      <Logo />
      <div className="flexRow">
        <div className="flexRow flexRowCenter">
          <Link to='/login' className="linkButton flexRow flexRowCenter">Login</Link>
        </div>
        <div className="flexRow flexRowCenter">
          <Link to='/register' className="linkButton flexRow flexRowCenter">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingHeader;
