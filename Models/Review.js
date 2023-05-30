const mongoose = require("mongoose");

const Review = new mongoose.Schema({
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["enabled", "disabled"],
        default: "enabled"
    },
    username: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Review", Review);
