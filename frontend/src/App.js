import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    console.log("Login function called");
    setAuthenticated(true);
  };

  const logout = () => {
    console.log("Logout function called");
    setAuthenticated(false);
  };
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/users">
          {isAuthenticated ? (
            <Users onLogout={logout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
