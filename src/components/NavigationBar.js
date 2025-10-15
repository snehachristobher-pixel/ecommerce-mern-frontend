import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/" activeClassName="active-link" exact="true">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active-link">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active-link">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/petsales" activeClassName="active-link">
            Pet Sales
          </NavLink>
        </li>
        <li>
          <NavLink to="/petAccessories" activeClassName="active-link">
            Pet Accessories
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" activeClassName="active-link">
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/review" activeClassName="active-link">
            Review
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
