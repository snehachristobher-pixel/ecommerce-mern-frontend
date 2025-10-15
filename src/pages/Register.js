import React, { useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      setMessage("Registration successful!");
      setMessageType("success");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      let errMsg = "Registration failed";
      if (err.response && err.response.data && err.response.data.message) {
        errMsg = err.response.data.message;
      } else if (err.request) {
        errMsg = "No response from server. Please try again later.";
      } else if (err.message) {
        errMsg = err.message;
      }
      setMessage("Error: " + errMsg);
      setMessageType("error");
    }
    setLoading(false);
  };

  return (
    <div className="register-bg">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
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
        <NavigationButtons prevPath="/login" nextPath="/" />
      </div>
    </div>
  );
}

export default Register;
