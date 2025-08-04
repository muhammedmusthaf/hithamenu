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
    const res = await axios.post("https://hithaadmin.vercel.app/api/upload/", formData);
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleUpload();
    const itemData = {
      ...data,
      image: imageUrl,
      portions: {
        quarter: Number(data.portions.quarter),
        half: Number(data.portions.half),
        full: Number(data.portions.full),
      },
    };
    await axios.post("https://hithaadmin.vercel.app/api/menu/", itemData, {
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
