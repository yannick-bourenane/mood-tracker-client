import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

import "../styles/navbar.css";

const Navbar = () => {
  let history = useHistory();
  let location = useLocation();
  return (
    <nav className="navbar">
      {"/dashboard" != location.pathname ? 
      <button className="navlinks btn-back" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button> : null
      }
      <NavLink className="navlinks" to="/dashboard">
        <img className="img-logo" src="/images/logo.png" alt="logo" />
      </NavLink>
      <NavLink className="navlinks btn-profile" to="/profile">
        <FontAwesomeIcon icon={faUserCircle} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
