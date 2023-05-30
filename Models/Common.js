const mongoose = require("mongoose");

const SubCategory = new mongoose.Schema({
    subcategorytitle : {
        type: String,
        required : true
    }
})
const Category = new mongoose.Schema({
    category_title : {
        type : String,
        required : true
    },
    subcategory : {
        type : [SubCategory],
        default : []
    }
})

const Shipping = new mongoose.Schema({
    pincode : {
        type : String,
        required : true
    },
    shippingCharge : {
        inr: {
            type: Number,
            required: true
        },
        aed : {
            type: Number,
            required: true
        }
    },
    days : {
        type : Number,
        required : true
    }
})

const Common = new mongoose.Schema({
    category : {
        type : [Category],  
    },
    shipping : {
        type : [Shipping],
    },
   
})

module.exports = mongoose.model("Common", Common);
