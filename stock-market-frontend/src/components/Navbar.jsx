import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/stocks">Stocks</NavLink>
      <NavLink to="/watchlist">Watchlist</NavLink>
    </nav>
  );
};

export default Navbar;
