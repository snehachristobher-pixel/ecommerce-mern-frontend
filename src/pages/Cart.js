import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Import CSS file for cart page styling

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
  if (!cart.items || cart.items.length === 0)
    return (
      <div className="cart-bg">
        <div className="cart-page-bg">
          <p className="cart-empty">Your cart is empty.</p>
          <NavigationButtons prevPath="/petsales" nextPath={null} />
        </div>
      </div>
    );

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
                  src={product.image}
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

        <button className="checkout-btn" onClick={() => navigate("/payment")}>
          Proceed to Payment
        </button>

        <NavigationButtons prevPath="/petsales" nextPath={null} />
      </div>
    </div>
  );
}

export default Cart;
