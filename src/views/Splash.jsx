import React from "react";
import { Link } from "react-router-dom";

import KeyFeatures from "../components/KeyFeatures";

import "../styles/splash.css";
import "../styles/css library/wickedcss.min.css";

const Splash = () => {
  return (
    <div className="splash-page flex-center-column">
      <div className="splash-header-wrapper">
        <div className="title-wrapper flex-center-column">
          <img
            className="splash-logo floater"
            src="/images/logo.png"
            alt="logo"
          />
          <img
            className="splash-detail"
            src="/images/splash_page/++.png"
            alt="logo"
          />
        </div>
        <div className="btn-wrapper flex-center-column">
          <Link to="/register">
            <button className="btn-splash shadow-btns btn-reg">Register</button>
          </Link>
          <Link to="/login">
            <button className="btn-splash shadow-btns btn-login">Login</button>
          </Link>
          <KeyFeatures />
        </div>
      </div>
    </div>
  );
};

export default Splash;
