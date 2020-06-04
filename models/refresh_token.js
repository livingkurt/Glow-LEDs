// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true }
}, { timestamps: true })

const refreshTokenModel = mongoose.model("RefreshToken", refreshTokenSchema)

// export default userModel;
module.exports = refreshTokenModel;