const express = require('express')
const orderRouter = express.Router()
const authN = require('../Middleware/authN');
const authUserAdmin = require("../Middleware/authUserAdmin")
const cartProduct = require('../Model/CartModel')


orderRouter.get("/order", authN, authUserAdmin, async (req, res) => {
    try {
        const userID = req.userID
        const username = req.username
        const cartItems = await cartProduct.find({ userID });//return a array
        if (cartItems.length === 0) {
            return res.status(404).json({ message: "your cart is empty" })
        }
        const totalPrice = cartItems.reduce((sum, item) => sum + item.productPrice, 0);


        const orderDetails = {
            NAME: username,
            UserId: userID,
            totalItems: cartItems.length,
            totalPrice,
            cartItems

        }
        res.status(202).json({ message: "Order details fetched successfully", orderDetails })
    }
    catch (err) {

        res.status(404).json({ error: err.message })
    }
})
module.exports = orderRouter