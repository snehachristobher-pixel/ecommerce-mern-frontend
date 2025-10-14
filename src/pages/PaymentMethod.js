import React, { useState } from "react";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";

const paymentOptions = [
  { label: "Credit/Debit Card", value: "card" },
  { label: "UPI", value: "upi" },
  { label: "Net Banking", value: "netbanking" },
  { label: "Cash on Delivery", value: "cod" },
];

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!method) {
      alert("Please select a payment method.");
      return;
    }
    setOrderConfirmed(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (orderConfirmed) {
    return (
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 20, textAlign: "center" }}>
        <h2>Thank you for your order!</h2>
        <p>Your payment method: <b>{method}</b> has been received.</p>
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
        <button type="submit" style={{ marginTop: 20 }}>Continue</button>
      </form>
      <NavigationButtons prevPath="/cart" nextPath={null} />
    </div>
  );
};

export default PaymentMethod;
