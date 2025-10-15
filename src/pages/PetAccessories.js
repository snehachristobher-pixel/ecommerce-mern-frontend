import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";

// If you have a separate fetchProducts utility, import and use it. Otherwise, use axios directly like below.
const columns = 6;

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
        // Option 1: using utility
        // const data = await fetchProducts();
        // Option 2: using axios directly
        const { data } = await axios.get("http://localhost:5000/api/products");
        console.log("All Products:", data);
        const accessories = data.filter((p) => p.category === "Accessories");
        setProducts(accessories);

        const initialQuantities = {};
        accessories.forEach((p) => (initialQuantities[p._id] = 1));
        setQuantities(initialQuantities);
      } catch (err) {
        setError(
          "Unable to load pet accessories. Please check your server and connection."
        );
        console.error(err);
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
      console.error(error);
    }
  };

  const placeholders = columns - (products.length % columns || columns);
  const placeholderArr = Array(placeholders < columns ? placeholders : 0).fill(
    null
  );

  if (loading) return <div>Loading pet accessories...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Pet Accessories</h2>
      {products.length === 0 ? (
        <div>No accessories available.</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                width: 200,
                minHeight: 350,
              }}
            >
              <img
                src={
                  p.image.startsWith("/images")
                    ? `http://localhost:5000${p.image}`
                    : p.image
                }
                alt={p.name}
                width={180}
                height={150}
                style={{ objectFit: "cover" }}
              />
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <p>
                <b>Price:</b> ₹{p.price}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button onClick={() => handleQuantityChange(p._id, -1)}>
                  -
                </button>
                <span>{quantities[p._id] || 1}</span>
                <button onClick={() => handleQuantityChange(p._id, +1)}>
                  +
                </button>
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
      )}
      <NavigationButtons prevPath="/petSales" nextPath="/cart" />
    </div>
  );
};

export default PetAccessories;
