import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api/config";
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
  const userId =
    token &&
    (() => {
      try {
        return JSON.parse(atob(token.split(".")[1])).id;
      } catch {
        return null;
      }
    })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method) {
      alert("Please select a payment method first.");
      return;
    }

    setOrderConfirmed(true);
    setLoading(true);
    setError("");

    if (userId) {
      try {
        await axios.delete(`${API_BASE}/api/cart/${userId}`);
        if (typeof setCart === "function") setCart({ items: [] });
      } catch (err) {
        setError("Failed to clear cart after payment!");
        console.error("Failed to clear cart after payment:", err);
      }
    }

    setLoading(false);
    setTimeout(() => {
      navigate("/review");
    }, 1500);
  };

  const handleBack = () => navigate("/cart");

  const handleNext = () => {
    if (!method) {
      alert(
        "First finish your payment by selecting a method and clicking Continue."
      );
      return;
    }
    navigate("/review");
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
          <p>Redirecting to review page...</p>
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

        {/* Back / Next buttons under card */}
        <div className="card-nav-buttons">
          <button
            type="button"
            className="nav-btn back-btn"
            onClick={handleBack}
          >
            ← Back
          </button>
          <button
            type="button"
            className="nav-btn next-btn"
            onClick={handleNext}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
