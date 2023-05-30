const moment = require("moment");
const Coupon = require("../Models/Coupon");

// add new Coupon
const AddCoupon = async (req, res) => {
    try {
        const existingCoupon = await Coupon.findOne({ couponcode: req.body?.couponcode });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon Code Already Exists" });
        }
        const coupon = new Coupon(req.body);
        await coupon.save();
        return res.status(200).json({ message: "Coupon Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// coupan validation check
const getCoupanDetails = async (req,res) => {
    try{
        const { couponCode } = req.query
        console.log("🚀 ~ file: Coupon.js:22 ~ getCoupanDetails ~ couponCode:", couponCode)
        const Coupondata = await Coupon.findOne({ couponcode: couponCode });
        let isValid = false
        if(Coupondata?.status === "active" && moment(Coupondata?.endDate).diff(moment(Coupondata?.startDate), 'days') >= 0){
            isValid = true
        }
        return res.status(200).json({ isValid ,Coupondata  });
    }catch(e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const fetchCoupons = async (req,res) => {
    try{
        const { skip = 0, limit = 10 } = req.query;
        const total = await Coupon.countDocuments();
        const Coupons = await Coupon.find().skip(Number(skip)).limit(Number(limit));
        return res.status(200).json({ Coupons, total });    
    }catch(e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const UpdateCoupon = async (req, res) => {
    try {
        const { id } = req.query;
        const data = req.body
        const existingCoupon = await Coupon.findById(id);
        if (!existingCoupon) {
            return res.status(400).json({ message: "Coupon not found" });
        }
        const updatedData = await Coupon.findByIdAndUpdate(id, data)
        return res.status(200).json({ message: "Coupon Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message }); 
    }
}

const DeleteCoupon = async (req, res) => {
    try{
        const { id } = req.query
        await Coupon.findByIdAndDelete(id)
        return res.status(200).json({ message : "Coupon Deleted Successfully" });
    }catch (e) {
        return res.status(500).json({ message: e.message }); 
    }
}

module.exports = {
    AddCoupon,
    getCoupanDetails,
    fetchCoupons,
    UpdateCoupon,
    DeleteCoupon
};

