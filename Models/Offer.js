const mongoose = require("mongoose");

const Offer = new mongoose.Schema({
    bannertype: {
        type: String,
        enum: ["home-page", "offer-page","both"],
        required: true,
        default : "offer-page"
    },
    offertitle : {
        type : String,
        required: true,
    },
    description : {
        type : String,
    },
    image: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Common",
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Common",
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
        default : "active"
    }
});

module.exports = mongoose.model("Offer", Offer);
