import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PetSales from "./pages/PetSales";
import PetAccessories from "./pages/PetAccessories";
import PaymentMethod from "./pages/PaymentMethod";
import Review from "./pages/Review";

function AppContent() {
  return (
    <>
      {/* Navigation bar visible on all pages */}
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/petsales" element={<PetSales />} />
        <Route path="/petAccessories" element={<PetAccessories />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
