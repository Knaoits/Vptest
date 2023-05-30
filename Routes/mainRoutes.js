const express = require("express");
const router = express.Router();
const controller = require("../Controllers");


// Login Api's EndPoint
router.post("/admin",controller.User.AdminLogin)
router.post("/user/login",controller.User.UserLogin)

// User Api's EndPoint
router.get("/user",controller.User.FetchUserList)
router.post("/user",controller.User.AddUser)
router.put("/user",controller.User.UpdateUser)
router.delete("/user",controller.User.DeleteUser)

// Product Api's EndPoint
router.get("/products", controller.Product.fetchProducts)
router.post("/product",controller.Product.AddProduct)
router.put("/product", controller.Product.updateProductStatus)
router.delete('/product',controller.Product.removeProduct)

// Offer Api's EndPoint
router.get("/offer",controller.Offer.FetchOffer)
router.post("/offer",controller.Offer.AddOffer)
router.put('/offer',controller.Offer.UpdateOffer)
router.delete('/offer',controller.Offer.DeleteOffer)

// Review Api's EndPoint
router.get('/review',controller.Review.fetchReviews)
router.post('/review',controller.Review.AddReview)
router.put('/review', controller.Review.UpdateReview)
router.delete('/review',controller.Review.RemoveReview)

// Order Api's EndPoint
router.get("/order",controller.Order.fetchOrders)
router.post("/order",controller.Order.AddOrder)
router.put('/order',controller.Order.updateOrderStatus)
router.put('/returnOrder',controller.Order.manageReturnOrder)

// Coupon Api's EndPoint
router.get("/coupon",controller.Coupon.fetchCoupons)
router.post("/coupon",controller.Coupon.AddCoupon)
router.put('/coupon', controller.Coupon.UpdateCoupon)
router.delete("/coupon",controller.Coupon.DeleteCoupon)
router.get("/coupanCheck",controller.Coupon.getCoupanDetails)


// Extra Api's EndPoint
router.post("/shipping",controller.Common.AddShippingCharge)
router.get("/shipping",controller.Common.fetchShippingChargeList)
router.post("/admin/category",controller.Common.AddCategory)
router.get("/category", controller.Common.fetchCategory)
router.put("/subcategory",controller.Common.AddSubCategory)
router.post('/cart',controller.User.AddToCart)

module.exports = router;    