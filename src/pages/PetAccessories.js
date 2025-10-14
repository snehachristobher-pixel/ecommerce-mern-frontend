import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "../api/products";
import NavigationButtons from "../components/NavigationButtons";

const columns = 6;

const PetAccessories = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      const accessories = data.filter((p) => p.category === "Accessories");
      setProducts(accessories);

      const initialQuantities = {};
      accessories.forEach((p) => (initialQuantities[p._id] = 1));
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

  // Updated Add to Cart function
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
      console.error("Error adding to cart:", error.response || error.message || error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const placeholders = columns - (products.length % columns || columns);
  const placeholderArr = Array(placeholders < columns ? placeholders : 0).fill(null);

  return (
    <div>
      <h2>Pet Accessories</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{ border: "1px solid #ccc", padding: 10, width: 200, minHeight: 350 }}
          >
            <img
              src={p.image.startsWith("/images") ? `http://localhost:5000${p.image}` : p.image}
              alt={p.name}
              width={180}
              height={150}
              style={{ objectFit: "cover" }}
            />
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p><b>Price:</b> ₹{p.price}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <button onClick={() => handleQuantityChange(p._id, -1)}>-</button>
              <span>{quantities[p._id] || 1}</span>
              <button onClick={() => handleQuantityChange(p._id, +1)}>+</button>
            </div>
            <button
              style={{ marginTop: 10, width: "100%", padding: 7 }}
              onClick={() => addToCart(p, quantities[p._id] || 1)}
            >
              Add to Cart
            </button>
          </div>
        ))}
        {placeholderArr.map((_, i) => (
          <div
            key={`placeholder-${i}`}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              width: 200,
              minHeight: 350,
              backgroundColor: "#f8f8f8",
              opacity: 0.5,
            }}
          />
        ))}
      </div>
      <NavigationButtons prevPath="/petSales" nextPath="/" />
    </div>
  );
};

export default PetAccessories;
