// src/pages/EditItem.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    portions: {
      quarter: "",
      half: "",
      full: ""
    },
    image: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get("https://hithaadmin.vercel.app/api/menu/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const item = res.data.find((i) => i._id === id);
      if (item) setData(item);
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`https://hithaadmin.vercel.app/api/menu/${id}`, {
      ...data,

      portions: {
        quarter: Number(data.portions.quarter),
        half: Number(data.portions.half),
        full: Number(data.portions.full),
      },
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/");
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <form className="form" onSubmit={handleUpdate}>
          <h2>Edit Item</h2>
          <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <input type="text" value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} />
          <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            <input type="number" placeholder="Base Price" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} required />
          <input type="number" placeholder="Quarter Price" value={data.portions.quarter} onChange={(e) => setData({ ...data, portions: { ...data.portions, quarter: e.target.value } })} />
          <input type="number" placeholder="Half Price" value={data.portions.half} onChange={(e) => setData({ ...data, portions: { ...data.portions, half: e.target.value } })} />
          <input type="number" placeholder="Full Price" value={data.portions.full} onChange={(e) => setData({ ...data, portions: { ...data.portions, full: e.target.value } })} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
