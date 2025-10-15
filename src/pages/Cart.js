import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(res.data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }
    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId, newQty) => {
    if (!userId || newQty < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/${userId}/${productId}`, {
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
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    if (!userId) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${userId}/${productId}`
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) => item.product && item.product._id !== productId
        ),
      }));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}`);
      setCart({ items: [] });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  if (!cart) return <p>Loading cart...</p>;
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty.</p>;

  const totalAmount = cart.items.reduce(
    (sum, item) =>
      item && item.product ? sum + item.product.price * item.qty : sum,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cart.items
          .filter((item) => item && item.product)
          .map(({ product, qty }) => (
            <li
              key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                gap: 20,
              }}
            >
              <img src={product.image} alt={product.name} width={100} />
              <div>
                <h4>{product.name}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={() => updateQuantity(product._id, qty - 1)}
                    disabled={qty <= 1}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => updateQuantity(product._id, qty + 1)}>
                    +
                  </button>
                </div>
                <p>Price per unit: ₹{product.price}</p>
                <p>Total: ₹{product.price * qty}</p>
              </div>
              <button onClick={() => removeItem(product._id)}>Remove</button>
            </li>
          ))}
      </ul>
      <h3>Total Amount: ₹{totalAmount}</h3>

      {/* Proceed to Payment */}
      <button
        style={{ margin: "20px 0", padding: "10px 30px" }}
        onClick={() => navigate("/payment")}
      >
        Proceed to Payment
      </button>

      <NavigationButtons prevPath="/petsales" nextPath={null} />
    </div>
  );
}

export default Cart;
