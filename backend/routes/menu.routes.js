import express from "express";

import Menuu from "../models/Menuu.model.js";
import Verify from "../middleware/Verify.js";



const menu = express.Router();

// GET all
menu.get("/", async (req, res) => {
  try {
    const items = await Menuu.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// POST new
menu.post("/", Verify, async (req, res) => {
  try {
    const newItem = new Menuu(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Add failed" });
  }
});

// PUT update
menu.put("/:id", Verify, async (req, res) => {
  try {
    const updated = await Menuu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

// DELETE
menu.delete("/:id", Verify, async (req, res) => {
  try {
    await Menuu.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
});

export default menu;
