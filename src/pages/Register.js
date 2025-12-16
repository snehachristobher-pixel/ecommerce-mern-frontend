import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await axios.post(
        `${API_BASE}/api/auth/register`,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Registration successful!");
      setMessageType("success");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      let errMsg = "Registration failed";
      if (err.response?.data?.message) errMsg = err.response.data.message;
      else if (err.request)
        errMsg = "No response from server. Please try again later.";
      else if (err.message) errMsg = err.message;
      setMessage(errMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/");
  const handleNext = () => navigate("/login");

  return (
    <div className="register-bg">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* inputs same as before */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              autoFocus
              disabled={loading}
            />
          </div>

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
            {loading ? "Registering..." : "Register"}
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

        {/* Styled Back / Next like Pet Accessories */}
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

export default Register;
