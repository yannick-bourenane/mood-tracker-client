import React from "react";
import Signin from "../components/form/Signin";
import AuthHeader from "../components/AuthHeader";

const Login = () => {
  return (
    <div className="form-page">
      <AuthHeader />
      <div className="form-wrapper">
        <h1 className="title">Login</h1>
        <Signin />
      </div>
    </div>
  );
};

export default Login;
