const mongoose = require("mongoose");


const Address = new mongoose.Schema({
    area : {
        type : String,
    },
    city : {
        type : String,
    },
    state : {
        type : String,
    },
    country : {
        type : String,
    },
    pincode : {
        type : Number
    }
})

const Cart = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    }
})

const User = new mongoose.Schema(
    {
        firstname : {
            type: String,
            required: true  
        },
        lastname : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        address : {
            type : [Address],
            default : []
        },
        phoneNumber : {
            type : Number,
            required : true
        },
        gender : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true,
            default : "Unblocked"
        },
        cart : {
            type : [Cart],
            fefault : []
        }
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("User", User);
