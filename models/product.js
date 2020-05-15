// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_1: { type: String, required: true },
  image_2: { type: String },
  image_3: { type: String },
  image_4: { type: String },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },

})

const productModel = mongoose.model("Product", productSchema)

// export default productModel;
module.exports = productModel;