import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Use a named import for jwtDecode.
import { useNavigate } from "react-router-dom";
import "../style/Login_Register.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // OAuth2PasswordRequestForm requires form-urlencoded data.
      const response = await axios.post(
        "http://localhost:8000/login",
        new URLSearchParams({ username, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      // Save the token
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      // Decode the token to extract the username (stored as 'sub')
      const decoded = jwtDecode(token);
      localStorage.setItem("username", decoded.sub);

      navigate("/home");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert">{error}</div>}
        <button type="submit" className="btn btn-primary auth-btn">
          Login
        </button>
      </form>
      <p className="auth-switch">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
