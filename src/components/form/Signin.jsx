import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
// custom tools
import UserContext from "../../auth/UserContext";
import APIHandler from "../../api/APIHandler";
import IconPassword from "../icon/IconPassword";
import IconMail from "../icon/IconMail";

export default withRouter(function Signin(props) {
  const [email, setEmail] = useState("john.doe@domain.com");
  const [password, setPassword] = useState("toto");

  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const apiRes = await APIHandler.post("/auth/signin", {
        email,
        password
      });

      if ( !!apiRes.data.currentUser ) {
        setCurrentUser(apiRes.data.currentUser);
        props.history.push("/dashboard");
      } else { throw new Error("Error with the authentification")}

    } catch (err) {
      console.log(err)
      setCurrentUser(null);
    }
  };
  return (
    <>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Email input"
            onChange={e => setEmail(e.target.value)}
            required
            defaultValue={email}
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
            defaultValue={password}
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
        No account yet ?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </>
  );
});
