"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// const mongoose = require('mongoose');
var tokenSchema = new mongoose_1.default.Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    user_id: { type: String }
}, {
    timestamps: true
});
var tokenModel = mongoose_1.default.model('Token', tokenSchema);
exports.default = tokenModel;
// module.exports = userModel;
