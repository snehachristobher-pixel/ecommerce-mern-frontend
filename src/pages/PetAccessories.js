import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api/config";
import "./PetAccessories.css";

const columns = 3;

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const PetAccessories = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API_BASE}/api/products`);
        const accessories = data.filter((p) => p.category === "Accessories");
        setProducts(accessories);

        const initialQuantities = {};
        accessories.forEach((p) => {
          initialQuantities[p._id] = 0;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        setError(
          "Unable to load pet accessories. Please check your server and connection."
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] ?? 0) + delta;
      if (newQuantity < 0) return prev;
      return { ...prev, [id]: newQuantity };
    });
  };

  const addToCart = async (product, quantity) => {
    const finalQty = quantity === 0 ? 1 : quantity;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    const decoded = decodeToken(token);
    const userId = decoded?.id;
    if (!userId) {
      alert("Invalid login session. Please login again.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/cart/`, {
        userId,
        productId: product._id,
        qty: finalQty,
      });
      alert(`Added ${finalQty} of ${product.name} to cart.`);
    } catch (err) {
      alert("Failed to add to cart. Please try again.");
    }
  };

  const placeholders = columns - (products.length % columns || columns);
  const placeholderArr = Array(placeholders < columns ? placeholders : 0).fill(
    null
  );

  const handleBack = () => navigate("/petsales");
  const handleNext = () => navigate("/cart");

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading pet accessories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="pets-title">Pet Accessories</h2>
      {products.length === 0 ? (
        <div>No accessories available.</div>
      ) : (
        <div className="card-grid">
          {products.map((p) => (
            <div className="card pet-card" key={p._id}>
              <img
                className="pet-img"
                src={
                  p.image?.startsWith("/images")
                    ? `${API_BASE}${p.image}`
                    : p.image
                }
                alt={p.name}
              />
              <div className="pet-info">
                <h4>{p.name}</h4>
                <div className="pet-desc">{p.description}</div>
                <div className="price">
                  <b>Price:</b> ₹{p.price}
                </div>
              </div>
              <div className="pet-footer">
                <div className="cart-controls">
                  <button
                    className="cart-btn"
                    type="button"
                    onClick={() => handleQuantityChange(p._id, -1)}
                  >
                    -
                  </button>
                  <span>{quantities[p._id] ?? 0}</span>
                  <button
                    className="cart-btn"
                    type="button"
                    onClick={() => handleQuantityChange(p._id, +1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-btn add-cart-btn"
                  type="button"
                  onClick={() => addToCart(p, quantities[p._id] ?? 0)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {placeholderArr.map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="card pet-card placeholder-card"
            />
          ))}
        </div>
      )}

      {/* Styled Back / Next buttons under grid */}
      <div className="card-nav-buttons">
        <button type="button" className="nav-btn back-btn" onClick={handleBack}>
          ← Back
        </button>
        <button type="button" className="nav-btn next-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default PetAccessories;
