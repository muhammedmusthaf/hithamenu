// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";

const Dashboard = ({ onLogout }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get("https://hithamenu.onrender.com/api/menu/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await axios.delete(`https://hithamenu.onrender.com/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchItems();
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header onLogout={onLogout} />
        <div className="dashboard">
          <div className="top-bar">
            <h2>Menu Items</h2>
            <Link to="/add" className="add-btn">Add New</Link>
          </div>
          <div className="item-list">
           {items.map((item) => (
  <div key={item._id} className="item-card">
    <img src={item.image} alt={item.name} />
    <h4>{item.name}</h4>
    <p><b>Category:</b> {item.category}</p>
    
    {/* Base Price */}
    <p><b>Starting Price:</b> ₹{item.price}</p>
    
    {/* Portion Prices */}
    {item.portions && Object.keys(item.portions).length > 0 && (
      <p><b>Portions:</b> {
        Object.entries(item.portions)
          .filter(([_, val]) => val !== undefined && val !== null)
          .map(([key, val]) => `${key}: ₹${val}`)
          .join(" | ")
      }</p>
    )}
    <div className="card-actions">
                  <Link to={`/edit/${item._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
  </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
