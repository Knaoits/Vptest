const mongoose = require("mongoose");

const Product = new mongoose.Schema(
    {
        product_name : {
            type: String,
            required: true  
        },
        sku_id : {
            type : String,
            unique : true,
            required : true
        },
        varients : {
            type : Array,
            default : [],
        },
        visibility : {
            type: String,
            enum: ["india", "dubai", "both"],
            required: true,
            default : "both"
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Common",
        },
        subcategory_id : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Common", 
        },
        description : {
            type : String,
        },
        price: {
            inr: {
                type: Number,
                required: true
            },
            aed: {
                type: Number,
                required: true
            }
        },
        quantity : {
            type: Number,
            required : true
        },
        image : {
            type : Array,
            default : [],
            required : true,
        },
        status: {
            type: String,
            enum: ["enabled", "disabled"],
            required: true,
            default : "enabled"
        },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("Product", Product);
