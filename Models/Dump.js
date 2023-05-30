const mongoose = require("mongoose");

const Dump = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("Dump", Dump);
