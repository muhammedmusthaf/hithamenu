// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={location.pathname === "/add" ? "active" : ""}>
          <Link to="/add">Add Item</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
