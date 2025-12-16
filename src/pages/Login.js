import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        {
          email: form.email.trim(),
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setForm({ email: "", password: "" });

      setTimeout(() => {
        navigate("/petsales");
      }, 800);
    } catch (err) {
      let errMsg = "Login failed";
      if (err.response && err.response.data && err.response.data.message) {
        errMsg = err.response.data.message;
      } else if (err.request) {
        errMsg = "No response from server. Please try again later.";
      } else if (err.message) {
        errMsg = err.message;
      }
      setMessage(errMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/");
  const handleNext = () => navigate("/petsales");

  return (
    <div className="login-bg">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
              type="email"
              onChange={handleChange}
              placeholder="Email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={form.password}
              type="password"
              onChange={handleChange}
              placeholder="Password"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`message ${messageType}`}
            aria-live="polite"
            role={messageType === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}

        {/* Styled Back / Next buttons under the card */}
        <div className="card-nav-buttons">
          <button
            type="button"
            className="nav-btn back-btn"
            onClick={handleBack}
            disabled={loading}
          >
            ← Back
          </button>
          <button
            type="button"
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={loading}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
