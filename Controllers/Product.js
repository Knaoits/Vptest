const Product = require("../Models/Product");

// add new Product
const AddProduct = async (req, res) => {
    try {
        const data = req.body
        const existingProduct = await Product.findOne({ product_name: req.body?.product_name });
        if (existingProduct) {
            return res.status(400).json({ message: "Product Already Exists" });
        }
        const product = new Product(data);
        await product.save();
        return res.status(200).json({ message: "Product Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const fetchProducts = async (req, res) => {
    try {
      const { skip = 0, limit = 10 } = req.query;
      const total = await Product.countDocuments();
      const products = await Product.find().skip(Number(skip)).limit(Number(limit));
      return res.status(200).json({ products, total });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

const updateProductStatus = async (req,res) =>{
    try{
        const { product_id,status } = req.query;
        const existingProduct = await Product.findOne({ product_name: req.body?.product_name });
        if (existingProduct) {
            return res.status(400).json({ message: "Product Already Exists" });
        }
        await Product.findByIdAndUpdate(product_id, { status : status })
        return res.status(200).json({ message : "Status Updated Successfully" });
    }catch(e){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const removeProduct = async (req,res) => {
    try{
        const { id } = req.query
        await Product.findByIdAndDelete(id)
        return res.status(200).json({ message : "Product Deleted Successfully" });
    }catch(e){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    AddProduct,
    fetchProducts,
    updateProductStatus,
    removeProduct
};

