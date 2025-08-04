import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const auth = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_HASH = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// POST /login
auth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL)
    return res.status(401).json({ error: "Unauthorized email" });

  const valid = await bcrypt.compare(password, ADMIN_HASH); // FIXED
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
  res.status(200).json({ token });
});
export default auth;
