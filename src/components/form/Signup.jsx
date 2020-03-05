import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
// custom tools
import UserContext from "../../auth/UserContext";
import APIHandler from "../../api/APIHandler";
import IconPassword from "../icon/IconPassword";
import IconMail from "../icon/IconMail";

export default withRouter(function Signup(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMessage] = useState("");

  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const handleSubmit = async (e) => {
      e.preventDefault();

      APIHandler.post("/auth/signup", {
        firstname,
        lastname,
        email,
        password
      }).then(results => {
        setCurrentUser(results.data.currentUser);
        props.history.push("/dashboard");
      }).catch((error) => {
        setCurrentUser(null);
        if ( error.response.data.msg ) {
          setErrorMessage(error.response.data.msg)
        }
      })

  };
  
  return (
    <>
      {errorMsg && <div className="notification is-danger">{errorMsg}</div>}

      <div className="field">
        <label className="label">First Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setLastname(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Email input"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <span className="icon is-small is-left">
            <IconMail size="lg" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="password"
            defaultValue=""
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span className="icon is-key is-left">
            <IconPassword size="lg" />
          </span>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <p className="parag">
        Already have an account ?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
    </>
  );
});
