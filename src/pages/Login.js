import React, { useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/petsales"); // redirect to Pet Sales
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <NavigationButtons prevPath="/" nextPath="/register" />
    </div>
  );
}

export default Login;
