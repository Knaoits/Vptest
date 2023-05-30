const Order = require("../Models/Order");
const Dump = require("../Models/Dump");
const User = require("../Models/User");
const Product = require("../Models/Product");


const manageProduct = async (product_id, quantity) => {
    await Product.findByIdAndUpdate(product_id, { $inc: { quantity: -quantity }})
}

const removeFromCart = async ( userId, product_id) => {
    try{
        const userData = await User.findById(userId)
        let cart = userData.cart
        const indexToRemove = userData?.cart.findIndex(item => String(item.product_id) === String(product_id));
        if (indexToRemove !== -1) {
            cart.splice(indexToRemove, 1);
            await User.findByIdAndUpdate(userId, { cart :  cart });
        }
        return
    }catch(e){
        console.log("🚀 ~ file: Order.js:25 ~ removeFromCart ~ e:", e)
        
    }
}

const AddOrder = async (req, res) => {
    try {
        const data = req.body
        const lastOrder = await Order.findOne().sort({_id: -1}).limit(1);
        const lastOrderId = lastOrder ? parseInt(lastOrder.orderId.substr(6)) : 0;
        const nextOrderId = "ORD" + (lastOrderId + 1).toString().padStart(6, '0');
        const order = new Order({...data, orderId: nextOrderId});
        await order.save();        
        for(const product of data?.products){
            await manageProduct(product?.product_id,product?.quantity)
            await removeFromCart(data?.userid,product?.product_id)
        }

        return res.status(200).json({ message: "Order Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message : e.message });
    }
};

const fetchOrders = async (req, res) => {
    try {
      const { skip = 0, limit = 10 } = req.query;
      const total = await Order.countDocuments();
      const Orders = await Order.find().skip(Number(skip)).limit(Number(limit));
      return res.status(200).json({ data : Orders, total });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateOrderStatus = async (req,res) =>{
    try{
        const { order_id,status } = req.query;
        const existingOrder = await Order.findById(order_id);
        if (existingOrder) {
            return res.status(400).json({ message: "Order Already Exists" });
        }
        await Order.findByIdAndUpdate(order_id, { status : status })
        return res.status(200).json({ message : "Status Updated Successfully" });
    }catch(e){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const manageReturnOrder = async (req, res) => {
    try{
        const { orderData , reason} = req.body;
        const existingOrder = await Order.findById(orderData?.order_id);
        if (!existingOrder) {
            return res.status(400).json({ message: "Order Not Exists" });
        }
        if(reason === "faulty"){
            const dumpData = await Dump.findOne({ product_id : orderData?.product_id })
            if(dumpData){
                await Dump.findOneAndUpdate({product_id : orderData?.product_id },{ $inc: { quantity: orderData?.quantity } })
            }else{
                const dump = new Dump({
                    product_id : orderData?.product_id,
                    quantity : orderData?.quantity
                })
                dump.save()
            }
        }else{
            await Product.findOneAndUpdate({product_id : orderData?.product_id },{ $inc: { quantity: orderData?.quantity } })
        }
        return res.status(200).json({ message : "Order Returned Successfully" });
    }catch(e){

    }
}

module.exports = {
    AddOrder,
    fetchOrders,
    updateOrderStatus,
    manageReturnOrder
};

