// src/pages/AddItem.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AddItem = () => {
  const [data, setData] = useState({
   name: '',
  category: '',
  price: '',
  portions: {
    quarter: '',
    half: '',
    full: ''
  },
  description: '',
  image: ''
  });

  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", data.image);
    const res = await axios.post("https://hithamenu.onrender.com/api/upload/", formData);
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if at least one price field is filled
  const hasAnyPrice =
    data.price ||
    data.portions.quarter ||
    data.portions.half ||
    data.portions.full;

  if (!hasAnyPrice) {
    alert("Please enter at least one price (base or portion).");
    return;
  }

  const imageUrl = await handleUpload();

  const itemData = {
    name: data.name,
    category: data.category,
    description: data.description,
    image: imageUrl,
    price: data.price ? Number(data.price) : undefined,
    portions: {
      quarter: data.portions.quarter ? Number(data.portions.quarter) : undefined,
      half: data.portions.half ? Number(data.portions.half) : undefined,
      full: data.portions.full ? Number(data.portions.full) : undefined,
    },
  };

  await axios.post("https://hithamenu.onrender.com/api/menu/", itemData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  navigate("/");
};


  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <form className="form" onSubmit={handleSubmit}>
          <h2>Add Menu Item</h2>
          <input type="text" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} required />
          <input type="text" placeholder="Category" onChange={(e) => setData({ ...data, category: e.target.value })} required />
          <textarea placeholder="Description" onChange={(e) => setData({ ...data, description: e.target.value })} />
            <input type="number" placeholder="Base Price" onChange={(e) => setData({ ...data, price: e.target.value })}  />
          <input type="number" placeholder="Quarter Price" onChange={(e) => setData({ ...data, portions: { ...data.portions, quarter: e.target.value } })} />
          <input type="number" placeholder="Half Price" onChange={(e) => setData({ ...data, portions: { ...data.portions, half: e.target.value } })} />
          <input type="number" placeholder="Full Price" onChange={(e) => setData({ ...data, portions: { ...data.portions, full: e.target.value } })} />
          <input type="file" onChange={(e) => setData({ ...data, image: e.target.files[0] })} required />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
