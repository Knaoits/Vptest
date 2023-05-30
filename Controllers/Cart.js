const User = require("../Models/User");

const AddToCart = async (req, res) => {
    try {
        const { user_id } = req.query;
        const data = req.body;
        const user = await User.findOneAndUpdate(
            { _id: user_id },
            { $push: { cart: data } },
            { new: true }
            );
        if(!user){
            return res.status(400).json({ message: "User Not Exists" });
        }

        res.json({ message: "Added to cart successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error adding to cart" });
    }
};
      

const RemovefromCart = async (req, res) =>{
    try{
        const { userId , cartId } = req.query;
        let user = {}
        if(cartId){
            user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { cart: { _id : cartId } } },
                { new: true }
            );
        }else{
            user = await User.findOneAndUpdate(
                { _id: userId },
                { cart: [] },
                { new: true }
            );
        }
      
          if (!user) {
            throw new Error("No user found in the User collection");
          }    
        res.status(200).json({ message: "Added to cart successfully" });
    }catch(e){
        res.status(400).json({ message: "Error Removing from cart" });
    }
}
module.exports = {
    AddToCart,
    RemovefromCart
};
  
