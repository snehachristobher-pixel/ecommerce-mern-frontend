import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api/config";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
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

  useEffect(() => {
    async function fetchCart() {
      if (!userId) {
        setCart({ items: [] });
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/api/cart/${userId}`);
        const items = Array.isArray(res.data) ? res.data : res.data.items || [];
        setCart({ items });
      } catch (err) {
        setError("Failed to fetch cart: " + (err.message || "Unknown error"));
        setCart({ items: [] });
      }
    }
    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId, newQty) => {
    if (!userId || newQty < 1) return;
    try {
      await axios.put(`${API_BASE}/api/cart/${userId}/${productId}`, {
        quantity: newQty,
      });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.product && item.product._id === productId
            ? { ...item, qty: newQty }
            : item
        ),
      }));
    } catch (err) {
      setError(
        "Failed to update quantity: " + (err.message || "Unknown error")
      );
    }
  };

  const removeItem = async (productId) => {
    if (!userId) return;
    try {
      await axios.delete(`${API_BASE}/api/cart/${userId}/${productId}`);
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) => item.product && item.product._id !== productId
        ),
      }));
    } catch (err) {
      setError("Failed to remove item: " + (err.message || "Unknown error"));
    }
  };

  const handleBack = () => navigate("/petAccessories");
  const handleNext = () => navigate("/payment"); // go to Payment page

  if (error) {
    return (
      <div className="cart-bg">
        <div className="cart-page-bg">
          <p style={{ color: "#d9534f" }}>{error}</p>
          <div className="card-nav-buttons">
            <button
              type="button"
              className="nav-btn back-btn"
              onClick={handleBack}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-bg">
        <div className="cart-page-bg">
          <p className="cart-empty">Your cart is empty.</p>
          <div className="card-nav-buttons">
            <button
              type="button"
              className="nav-btn back-btn"
              onClick={handleBack}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = cart.items.reduce(
    (sum, item) =>
      item && item.product ? sum + item.product.price * item.qty : sum,
    0
  );

  return (
    <div className="cart-bg">
      <div className="cart-page-bg">
        <h2 className="cart-title">Your Cart</h2>
        <ul className="cart-list">
          {cart.items
            .filter((item) => item && item.product)
            .map(({ product, qty }) => (
              <li key={product._id} className="cart-list-item">
                <img
                  className="cart-item-image"
                  src={
                    product.image?.startsWith("/images")
                      ? `${API_BASE}${product.image}`
                      : product.image
                  }
                  alt={product.name}
                />
                <div>
                  <h4>{product.name}</h4>
                  <div className="cart-controls">
                    <button
                      onClick={() => updateQuantity(product._id, qty - 1)}
                      disabled={qty <= 1}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => updateQuantity(product._id, qty + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <p>Price per unit: ₹{product.price}</p>
                  <p>Total: ₹{product.price * qty}</p>
                </div>
                <button
                  onClick={() => removeItem(product._id)}
                  className="cart-remove-btn"
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
        <h3>Total Amount: ₹{totalAmount}</h3>

        {/* Main checkout button */}
        <button className="checkout-btn" onClick={handleNext}>
          Proceed to Payment
        </button>

        {/* Back / Next buttons */}
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
}

export default Cart;
