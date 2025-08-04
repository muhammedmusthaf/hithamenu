// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout && onLogout();
    navigate("/login");
  };

  return (
    <div className="header">
      <h2>Welcome, Admin</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
