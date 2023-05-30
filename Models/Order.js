const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    priceType : {
        type: String,
        enum: ["inr", "aed"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "delivered"],
        required: true,
        default : 'pending'
    },
    orderdate: {
        type: Date,
        required: true,
    },
    shippingcharge: {
        type: Number,
        required: true,
    },
    orderamount: {
        type: Number,
        required: true,
    },
    totalamount: {
        type: Number,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: String,
        required: true,
    },
    shippingdate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Order", Order);
