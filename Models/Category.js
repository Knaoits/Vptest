const mongoose = require("mongoose");

const SubCategory = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
})

const Category = new mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    subcategory : {
        type : [SubCategory],
        default : []
    }
})

module.exports = mongoose.model("Category", Category);
