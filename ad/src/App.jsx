// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";



const App = () => {
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
      <Routes>
        {!token ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
