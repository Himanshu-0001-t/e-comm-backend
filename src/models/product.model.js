import mongoose from "mongoose";

const porductShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  productImageURL: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  brand: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    default: 0
  },
  colors: [
    {
      type: String,
      required: true
    }
  ],
  image: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Product = mongoose.model("Product", porductShema)

export default Product