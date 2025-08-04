// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import ScrollTop from "./components/ScrollTop";


const AppContent = ({ onLogout }) => {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Dashboard onLogout={onLogout} />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <AppContent onLogout={handleLogout} />
      )}
    </Router>
  );
}
