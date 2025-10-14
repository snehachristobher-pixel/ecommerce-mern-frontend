import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import PetSales from './pages/PetSales';
import PetAccessories from "./pages/PetAccessories";
import PaymentMethod from "./pages/PaymentMethod";
import Review from "./pages/Review";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/petsales' element={<PetSales />} />
        <Route path="/petAccessories" element={<PetAccessories />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/review" element={<Review />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
