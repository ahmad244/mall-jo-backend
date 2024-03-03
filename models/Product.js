import mongoose from "mongoose";

const { Schema, model } = mongoose;


const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array, required: true },
    productSpecs: { type: Map, of: [String], required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default model("Product", ProductSchema);

