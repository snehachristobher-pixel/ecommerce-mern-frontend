import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { API_BASE } from "../api/config";
import "./PetSales.css";

const columns = 3;

const PetSales = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      const pets = data.filter((p) => p.category === "Pets");
      setProducts(pets);

      const initialQuantities = {};
      pets.forEach((p) => {
        initialQuantities[p._id] = 0; // start from 0
      });
      setQuantities(initialQuantities);
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
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      await axios.post(`${API_BASE}/api/cart/`, {
        userId,
        productId: product._id,
        qty: finalQty,
      });
      alert(`Added ${finalQty} of ${product.name} to cart.`);
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response || error.message || error
      );
      alert("Failed to add to cart. Please try again.");
    }
  };

  const placeholders = columns - (products.length % columns || columns);
  const placeholderArr = Array(placeholders < columns ? placeholders : 0).fill(
    null
  );

  const handleBack = () => navigate("/login");
  const handleNext = () => navigate("/petAccessories");

  return (
    <div className="page-container">
      <h2 className="pets-title">Pets for Sale</h2>
      <div className="card-grid">
        {products.map((p) => (
          <div className="card pet-card" key={p._id}>
            <img
              className="pet-img"
              src={
                p.image.startsWith("/images")
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
                  onClick={() => handleQuantityChange(p._id, -1)}
                  type="button"
                >
                  -
                </button>
                <span>{quantities[p._id] ?? 0}</span>
                <button
                  className="cart-btn"
                  onClick={() => handleQuantityChange(p._id, +1)}
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                className="cart-btn add-cart-btn"
                onClick={() => addToCart(p, quantities[p._id] ?? 0)}
                type="button"
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

export default PetSales;
