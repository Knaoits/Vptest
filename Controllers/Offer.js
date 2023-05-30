const Offer = require("../Models/Offer");

// add new Offer
const AddOffer = async (req, res) => {
    try {
        const existingOffer = await Offer.findOne({ offertitle: req.body?.offertitle });
        if (existingOffer) {
            return res.status(400).json({ message: "Offer Already Exists" });
        }
        const offer = new Offer(req.body);
        await offer.save();
        return res.status(200).json({ message: "Offer Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const UpdateOffer = async (req, res) => {
    try {
        const { id } = req.query;
        const data = req.body
        const existingOffer = await Offer.findById(id);
        if (!existingOffer) {
            return res.status(400).json({ message: "Offer not found" });
        }
        const updatedData = await Offer.findByIdAndUpdate(id, data)
        return res.status(200).json({updatedData, message: "Offer Updated Successfully" });
    } catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const FetchOffer = async (req,res) => {
    try{
        const { skip = 0, limit = 10 } = req.query;
        const total = await Offer.countDocuments();
        const offers = await Offer.find().skip(Number(skip)).limit(Number(limit));
        return res.status(200).json({ offers, total });    
    }catch(e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const DeleteOffer = async (req, res) => {
    try{
        const { id } = req.query
        await Offer.findByIdAndDelete(id)
        return res.status(200).json({ message : "Offer Deleted Successfully" });
    }catch (e) {
        return res.status(500).json({ message: e.message }); 
    }
}

module.exports = {
    AddOffer,
    UpdateOffer,
    DeleteOffer,
    FetchOffer
};

