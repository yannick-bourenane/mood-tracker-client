import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "bulma/css/bulma.css";

import Navbar from "./components/Navbar";
import Splash from "./views/Splash";
import NotFound from "./views/NotFound";
import TrackMood from "./views/TrackMood";
import Stats from "./views/Stats";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Dashboard from "./views/Dashboard";
import Contacts from "./views/Contacts";

// auth
import { useAuth } from "./auth/useAuth";
import UserContext from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

function App({ location }) {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});

  // check src/auth/UserContext =>
  // MANDATORY TO GET/SET loggedin currentUser against server response
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <div className="App">
          {location.pathname != "/" &&
            location.pathname != "/register" &&
            location.pathname != "/login" && <Navbar />}
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/daymood/new" component={TrackMood} />
            <ProtectedRoute path="/stats" component={Stats} />
            <ProtectedRoute path="/contacts" component={Contacts} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      )}
    </UserContext.Provider>
  );
}

export default withRouter(App);
