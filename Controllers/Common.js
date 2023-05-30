const Common = require("../Models/Common");
const { ObjectId } = require('mongodb');

const AddCategory = async (req, res) => {
    try {
        const existing = await Common.find();
        if(existing?.length <= 0){
            const common = new Common(req.body);
            common.save()
        }else{
            const commonId = existing[0]._id;
            const newCategory = {
              _id: ObjectId(), 
              category_title: req.body?.category[0]?.category_title,
              subcategory : req.body?.category[0]?.subcategory
            };
            
            await Common.findOneAndUpdate(
              { _id: commonId },
              { $push: { category: newCategory } }
            );
        }
        res.status(200).json({ message : "User Added Successfully"});
    } catch(e) {
        console.log("🚀 ~ file: Common.js:25 ~ AddCategory ~ e:", e)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const AddSubCategory = async ( req, res) => {
    try{    
        const { category_id } = req.query;
        const { subcategory } = req.body;        
        await Common.findOneAndUpdate(
            { "category._id": category_id },
            { $push: { "category.$.subcategory": subcategory }},
            { new: true }
          );
          res.status(200).json({ message : "SubCategory Added Successfully"});
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const fetchShippingChargeList = async (req,res) => {
    try{
        const ShippingData = await Common.findOne().select("shipping");
        console.log("🚀 ~ file: Common.js:48 ~ fetchShippingChargeList ~ ShippingData:", ShippingData)
        res.status(200).json(ShippingData.shipping.reverse());
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const AddShippingCharge = async (req, res) => {
    try{
        const data = req.body
        const existing = await Common.find();
        if(existing?.length <= 0){
            const common = new Common(data);
            common.save()
        }else{
            const isExist = await Common.findOne({ "shipping.pincode": data?.pincode });

            if (isExist) {
              return res.status(400).json({ message: "Pincode Already Exists, You need to Edit that" });
            }
            
            const commonId = existing[0]._id;
            const newData = {
              _id: ObjectId(),
              pincode: data?.pincode,
              shippingCharge: data?.price,
              days: data?.days
            };
            
            await Common.findOneAndUpdate(
              { _id: commonId },
              { $push: { shipping : newData } }
            );
        }
        res.status(200).json({ message : "Shipping updated Successfully"});
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const fetchCategory = async (req, res) => {
    try{
        const categories = await Common.findOne().select("category");
        res.status(200).json(categories.category);
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {
    AddCategory,
    AddSubCategory,
    AddShippingCharge,
    fetchCategory,
    fetchShippingChargeList
};
  
