import express from "express";
import MenuItem from "../models/menuitem.model.js";
import verifyToken from "../middleware/verifytoken.js";



const menu = express.Router();

// GET all
menu.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// POST new
menu.post("/", verifyToken, async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Add failed" });
  }
});

// PUT update
menu.put("/:id",verifyToken, async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

// DELETE
menu.delete("/:id",verifyToken, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
});

export default menu;
