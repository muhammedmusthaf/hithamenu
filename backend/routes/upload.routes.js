import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const hotela = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hotel-menu",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

hotela.post("/", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ imageUrl: req.file.path });
  } catch (err) {
    res.status(400).json({ error: "Upload failed" });
  }
});

export default hotela;
