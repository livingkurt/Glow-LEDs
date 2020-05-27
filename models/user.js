// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  // confirmed: { type: Boolean, requried: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
  shipping: shippingSchema,
})

const userModel = mongoose.model("User", userSchema)

// export default userModel;
module.exports = userModel;