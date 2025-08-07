import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number  }, // base price (e.g., starting price)
  portions: {
    quarter: { type: Number },
    half: { type: Number },
    full: { type: Number },
  },
  description: String,
  image: String,
}, { timestamps: true });

const Menuu = mongoose.model("Menuu", MenuItemSchema);
export default Menuu;
