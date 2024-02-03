import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./ApiConfig";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registration response:", response);
      history.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
        <Link to="/login">Back to Login</Link>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
