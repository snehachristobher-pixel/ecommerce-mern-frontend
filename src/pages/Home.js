import React from "react";
import "./Home.css";

const homeBgUrl =
  "https://img.freepik.com/free-vector/frame-with-dogs-vector-white-background_53876-127700.jpg?w=2000";

const Home = () => {
  return (
    <div className="home-bg" style={{ backgroundImage: `url(${homeBgUrl})` }}>
      <main className="home-main">
        <div className="home-card">
          <section className="home-hero">
            <h1 className="home-title">Welcome to Pet Paradise!</h1>
            <p className="home-subtitle">
              Your one-stop shop for pets and accessories!
            </p>
          </section>

          <section className="home-why">
            <h3 className="home-why-title center-align">Why Shop With Us?</h3>
            <ul>
              <li>Wide Selection of Pets and Accessories</li>
              <li>Trusted Breeders &amp; Brands</li>
              <li>Easy Returns and Guarantees</li>
              <li>Fast, Reliable Shipping</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
