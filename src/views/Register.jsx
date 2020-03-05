import React from "react";
import Signup from "../components/form/Signup";
import AuthHeader from "../components/AuthHeader";

const Register = () => {
  return (
    <div className="form-page">
      <AuthHeader />
      <div className="form-wrapper">
        <h1 className="title">Register</h1>
        <Signup />
      </div>
    </div>
  );
};

export default Register;
