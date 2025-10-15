import React, { useState } from "react";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentMethod.css";

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
        await axios.delete(`http://localhost:5000/api/cart/${userId}`);
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
      <div className="payment-bg">
        <div className="payment-confirmation">
          <h2>Thank you for your order!</h2>
          <p>
            Your payment method: <b>{method}</b> has been received.
          </p>
          {loading && <p>Processing cart cleanup...</p>}
          {error && <p className="error-message">{error}</p>}
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-bg">
      <div className="payment-container">
        <h2 className="payment-title">Select Payment Method</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          {paymentOptions.map((opt) => (
            <div key={opt.value} className="payment-option">
              <input
                type="radio"
                id={opt.value}
                name="payment"
                value={opt.value}
                checked={method === opt.value}
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor={opt.value} className="payment-label">
                {opt.label}
              </label>
            </div>
          ))}
          <button type="submit" className="payment-submit">
            Continue
          </button>
        </form>
        <NavigationButtons prevPath="/cart" nextPath={null} />
      </div>
    </div>
  );
};

export default PaymentMethod;
