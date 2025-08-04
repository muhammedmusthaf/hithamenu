import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }, // base price (e.g., starting price)
  portions: {
    quarter: { type: Number },
    half: { type: Number },
    full: { type: Number },
  },
  description: String,
  image: String,
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
export default MenuItem;
