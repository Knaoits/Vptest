const Review = require("../Models/Review");


const fetchReviews = async (req, res) => {
    try {
        const { skip = 0, limit = 10 } = req.query;
        const total = await Review.countDocuments();
        const Reviews = await Review.find().populate('productid').skip(Number(skip)).limit(Number(limit));
        return res.status(200).json({ Reviews, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

// add new Review
const AddReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        return res.status(200).json({ message: "Review Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const UpdateReview = async (req, res) => {
    try {
        const { id } = req.query;
        const data = req.body
        const existingReview = await Review.findById(id);
        if (!existingReview) {
            return res.status(400).json({ message: "Review not found" });
        }
        const updatedData = await Review.findByIdAndUpdate(id, data)
        return res.status(200).json({ message: "Review Added Successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message }); 
    }
}

const RemoveReview = async (req,res) => {
    try{
        const { id } = req.query
        await Review.findByIdAndDelete(id)
        return res.status(200).json({ message : "Review Deleted Successfully" });
    }catch(e){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    AddReview,
    UpdateReview,
    fetchReviews,
    RemoveReview
};

