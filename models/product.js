// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  display_image: { type: String, required: true },
  video: { type: String },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  facts: { type: String },
  description: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },

})

const productModel = mongoose.model("Product", productSchema)

// export default productModel;
module.exports = productModel;
