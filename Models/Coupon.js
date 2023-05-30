const mongoose = require("mongoose");

const Coupan = new mongoose.Schema({
    couponcode: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    discountvalue : {
        type: Number,
    },
    coupontype: {
        type: String,
        enum: ["percentage", "amount"],
        required: true
    },
    inr : {
        type : Number
    },
    aed : {
        type : Number
    },
    minamount : {
        type : Number
    },
    minqty : {
        type : Number
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    }
   
})

module.exports = mongoose.model("Coupan", Coupan);
