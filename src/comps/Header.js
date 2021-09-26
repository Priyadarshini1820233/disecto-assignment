//Navigation bar containing Home, Add Collection, Gallery


import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-fulid">
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "	rgb(0,0,255)" }}
      >
        <NavLink to="/" className="btn" style={{ color: "white" }}>
          Home
        </NavLink>
        <NavLink to="/add" className="btn" style={{ color: "white" }}>
          Add Collection
        </NavLink>
        <NavLink to="/gallery" className="btn" style={{ color: "white" }}>
          Gallery
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
