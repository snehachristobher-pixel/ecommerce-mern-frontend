import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "../api/products";
import NavigationButtons from "../components/NavigationButtons";
import "./PetSales.css";

const columns = 3; // show 3 per row by default

const PetSales = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      const pets = data.filter((p) => p.category === "Pets");
      setProducts(pets);
      const initialQuantities = {};
      pets.forEach((p) => (initialQuantities[p._id] = 1));
      setQuantities(initialQuantities);
    }
    load();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 1) + delta;
      if (newQuantity < 1) return prev;
      return { ...prev, [id]: newQuantity };
    });
  };

  const addToCart = async (product, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      await axios.post(`http://localhost:5000/api/cart/`, {
        userId,
        productId: product._id,
        qty: quantity,
      });
      alert(`Added ${quantity} of ${product.name} to cart.`);
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

  return (
    <div className="petsales-bg">
      <h2 className="pets-title">Pets for Sale</h2>
      <div className="grid-container">
        {products.map((p) => (
          <div className="pet-card" key={p._id}>
            <img
              className="pet-img"
              src={
                p.image.startsWith("/images")
                  ? `http://localhost:5000${p.image}`
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
                >
                  -
                </button>
                <span>{quantities[p._id] || 1}</span>
                <button
                  className="cart-btn"
                  onClick={() => handleQuantityChange(p._id, +1)}
                >
                  +
                </button>
              </div>
              <button
                className="cart-btn"
                style={{ width: "100%" }}
                onClick={() => addToCart(p, quantities[p._id] || 1)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        {placeholderArr.map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="pet-card"
            style={{
              opacity: 0.3,
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          />
        ))}
      </div>
      <NavigationButtons prevPath="/" nextPath="/petAccessories" />
    </div>
  );
};

export default PetSales;
