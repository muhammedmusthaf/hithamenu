import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import connectDB from "./db/db.js";
import menu from "./routes/menu.routes.js";
import hotela from "./routes/upload.routes.js";
import auth from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: [
        "https://hithamenu.vercel.app/","https://hithaadmin.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use("/api/menu", menu);
app.use("/api/upload", hotela);
app.use("/api/auth", auth);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
