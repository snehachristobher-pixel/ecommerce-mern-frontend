import React, { useState } from "react";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const paymentOptions = [
  { label: "Credit/Debit Card", value: "card" },
  { label: "UPI", value: "upi" },
  { label: "Net Banking", value: "netbanking" },
  { label: "Cash on Delivery", value: "cod" },
];

const PaymentMethod = ({ setCart }) => {
  const [method, setMethod] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = token
    ? (() => {
        try {
          return JSON.parse(atob(token.split(".")[1])).id;
        } catch {
          return null;
        }
      })()
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method) {
      alert("Please select a payment method.");
      return;
    }
    setOrderConfirmed(true);
    setLoading(true);
    setError("");

    if (userId) {
      try {
        // You may need to send auth header if required.
        await axios.delete(`http://localhost:5000/api/cart/${userId}`, {
          // headers: { Authorization: `Bearer ${token}` }
        });
        if (typeof setCart === "function") setCart({ items: [] });
      } catch (err) {
        setError("Failed to clear cart after payment!");
        console.error("Failed to clear cart after payment:", err);
      }
    }

    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (orderConfirmed) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          padding: 20,
          textAlign: "center",
        }}
      >
        <h2>Thank you for your order!</h2>
        <p>
          Your payment method: <b>{method}</b> has been received.
        </p>
        {loading && <p>Processing cart cleanup...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Select Payment Method</h2>
      <form onSubmit={handleSubmit}>
        {paymentOptions.map((opt) => (
          <div key={opt.value} style={{ marginBottom: 10 }}>
            <input
              type="radio"
              id={opt.value}
              name="payment"
              value={opt.value}
              checked={method === opt.value}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor={opt.value} style={{ marginLeft: 8 }}>
              {opt.label}
            </label>
          </div>
        ))}
        <button type="submit" style={{ marginTop: 20 }}>
          Continue
        </button>
      </form>
      <NavigationButtons prevPath="/cart" nextPath={null} />
    </div>
  );
};

export default PaymentMethod;
