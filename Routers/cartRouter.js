const express = require('express');
const cartRouter = express.Router();
const cartProduct = require('../Model/CartModel')
const Products = require('../Model/ProductModel');
const authN = require('../Middleware/authN');
const authUserAdmin = require("../Middleware/authUserAdmin")


cartRouter.post("/cart/add/:id", authN, authUserAdmin, async (req, res) => {
    try {
        const { productName, productId, productPrice, productImage, productDescription } = await Products.findOne({ productId: parseInt(req.params.id) })
        const userID = req.userID;
        const newAddCart = new cartProduct({ userID, productName, productId, productPrice, productImage, productDescription });
        await newAddCart.save()
        res.status(201).json({ message: "add this product successfully in your cart" })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }

})


cartRouter.get("/cart", authN, authUserAdmin, async (req, res) => {
    try {
        const userID = req.userID;
        const userCart = await cartProduct.find({ userID });

        if (userCart.length === 0) {
            return res.status(201).json({ message: "your cart is Empty" })
        }
        res.status(201).json({ message: "your cart ", userCart })
    }
    catch (err) {
        res.status(201).json({ error: err.message })
    }
})

cartRouter.delete("/cart/delete/:id", authN, authUserAdmin, async (req, res) => {
    try {
        const deleteById = await cartProduct.findOneAndDelete({ productId: parseInt(req.params.id) })
        if (!deleteById) {
            return res.status(404).json({ message: "this product is not in your cart" })
        }
        res.status(201).json({ message: "this product is removed from your Cart" })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
})

module.exports = cartRouter;