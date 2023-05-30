const Order = require("../Models/Order");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

// add new user
const AddUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ phoneNuumber : req.body.phoneNumber });
        console.log("🚀 ~ file: User.js:7 ~ AddUser ~ existingUser:", existingUser)
        if (existingUser) {
          return res.status(400).json({ message: "User with the same phoneNumber already exists" });
        }
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ message : "User Added Successfully"});
    } catch(e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// update User data and status
const UpdateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const data   = req.body;
        const existingUser = await User.findById(id);
        if (!existingUser) {
          return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        await User.updateOne({ _id: id }, data);
        res.status(200).json({ message : "User Updated Successfully"});
    } catch(e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// delete user
const DeleteUser = async (req, res) => {
    try {
        const {id} = req.query; // Get the user ID from the request parameters
        const deletedUser = await User.deleteOne({ _id: id });
        await Order.deleteMany({ userid : id })
        if (deletedUser.deletedCount === 0) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch(e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// fetchuserlist 
const FetchUserList = async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch(e) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// userlogin
const UserLogin = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber, password });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.status === "blocked") {
            return res.status(403).json({ message: "User is blocked. Please contact support for assistance." });
        }
        const token = jwt.sign({ userId: user._id }, "VpllexUser");
        res.status(200).json({ message : "Login Successfully" , token, userId: user._id, username: user.username });
    } catch (e) {
      console.log("🚀 ~ file: User.js:73 ~ UserLogin ~ e:", e)
      res.status(500).json({ message: "Internal Server Error" });
    }
};

// adminLogin
const AdminLogin = async (req,res) => {
    try{
        const { username, password } = req.body;
        if (username === "admin" && password === "admin") {
          const token = jwt.sign({ username: "admin" }, "VpllexAdmin");
          res.status(200).json({ message : "Login SuccessFully" , token,username: 'admin' });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
    } catch(e){
        console.log("🚀 ~ file: User.js:86 ~ AdminLogin ~ e:", e)
        res.status(500).json({ message: "Internal Server Error" });
    }
}



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


module.exports = {
    AddUser,
    UpdateUser,
    DeleteUser,
    FetchUserList,
    UserLogin,
    AdminLogin,
    AddToCart
};
  
