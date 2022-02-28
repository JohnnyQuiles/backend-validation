const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderName: { type: String },
    orderAmount: { type: Number },
    orderItems: { type: Array },
    orderOwner: { type: mongoose.Schema.ObjectId, ref: 'user' }
}, { timestamps: true, });

module.exports = mongoose.model("order", orderSchema);