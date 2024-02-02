import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./ApiConfig";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({ onLogin }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}login`, {
        username,
        password,
      });

      const user = response.data;

      if (user) {
        console.log("Login successful:", user);
        onLogin();
        history.push("/users");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("An error occurred during login");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div>
      <h1>TODO Login</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            onKeyDown={handleKeyDown}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            onKeyDown={handleKeyDown}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <Link to="/register">I don't have an account</Link>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
