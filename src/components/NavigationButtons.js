import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const getClassName = ({ isActive }) => (isActive ? "active-link" : undefined);

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/" className={getClassName} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={getClassName}>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={getClassName}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/petsales" className={getClassName}>
            Pet Sales
          </NavLink>
        </li>
        <li>
          <NavLink to="/petAccessories" className={getClassName}>
            Pet Accessories
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={getClassName}>
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/review" className={getClassName}>
            Review
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
