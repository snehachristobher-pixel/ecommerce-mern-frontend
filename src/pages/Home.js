import React from "react";
import { Link } from "react-router-dom";

const homeBgUrl = "https://img.freepik.com/free-vector/frame-with-dogs-vector-white-background_53876-127700.jpg?w=2000";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${homeBgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#222",
        overflowX: "hidden"
      }}
    >
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            background: "rgba(255, 255, 255, 0.7)",
            padding: "20px 0",
            margin: 0,
            listStyle: "none",
          }}
        >
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/petSales">Pet Sales</Link></li>
          <li><Link to="/petAccessories">Pet Accessories</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/review">Reviews</Link></li>
        </ul>
      </nav>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ color: "Red", fontSize: "3em" }}>Welcome to Pet Paradise!</h1>
        <p>Your one-stop shop for pets and accessories!</p>
      </div>

      <section style={{
        textAlign: "center",
        marginTop: "50px",
        padding: "30px 15px",
        background: "rgba(255,255,255,0.95)",
        maxWidth: 650,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 12
      }}>
        <h3 style={{ color: "magenta", fontSize: "2em" }}>Why Shop With Us?</h3>
        <ul style={{
          textAlign: "left",
          margin: "30px auto 0 auto",
          fontSize: "1.25em",       // Increase bullet text size!
          fontWeight: 500,
          lineHeight: "2.2em",      // Spacing for readability
          listStyleType: "disc",    // Ensure native bullet points
          paddingLeft: "28px",      // Proper indent for bullets
          maxWidth: 500
        }}>
          <li>Wide Selection of Pets and Accessories</li>
          <li>Trusted Breeders & Brands</li>
          <li>Easy Returns and Guarantees</li>
          <li>Fast, Reliable Shipping</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
