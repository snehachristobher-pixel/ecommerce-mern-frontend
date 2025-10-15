import React, { useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      setMessage("Registration successful!");
      // Optionally clear form or redirect after registration
    } catch (err) {
      if (err.response) {
        // Server responded with an error status
        setMessage(
          "Error: " + (err.response.data.message || "Registration failed")
        );
      } else if (err.request) {
        // Request sent but no response received
        setMessage("Error: No response from server. Please try again later.");
      } else {
        // Other errors
        setMessage("Error: " + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          value={form.password}
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <NavigationButtons prevPath="/login" nextPath="/" />
    </div>
  );
}

export default Register;
