import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";
import "./PetAccessories.css"; // <-- Use the provided CSS file

const columns = 3; // Consistent with grid layout

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
        const { data } = await axios.get("http://localhost:5000/api/products");
        const accessories = data.filter((p) => p.category === "Accessories");
        setProducts(accessories);

        const initialQuantities = {};
        accessories.forEach((p) => (initialQuantities[p._id] = 1));
        setQuantities(initialQuantities);
      } catch (err) {
        setError(
          "Unable to load pet accessories. Please check your server and connection."
        );
      }
      setLoading(false);
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
      alert("Failed to add to cart. Please try again.");
    }
  };

  const placeholders = columns - (products.length % columns || columns);
  const placeholderArr = Array(placeholders < columns ? placeholders : 0).fill(
    null
  );

  if (loading) return <div>Loading pet accessories...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="petsales-bg">
      <h2 className="pets-title">Pet Accessories</h2>
      {products.length === 0 ? (
        <div>No accessories available.</div>
      ) : (
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
      )}
      <NavigationButtons prevPath="/petSales" nextPath="/cart" />
    </div>
  );
};

export default PetAccessories;
