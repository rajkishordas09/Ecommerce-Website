//FOR MYSQL CART ROUTER

const express = require("express");
const cartRouter = express.Router();

const db = require("../config/db-client");
const authN = require("../Middleware/authN");
const authUserAdmin = require("../Middleware/authUserAdmin");

// ================= ADD TO CART =================
cartRouter.post("/cart/add/:id", authN, authUserAdmin, async (req, res) => {
    try {
        const userID = req.userID;
        const productId = parseInt(req.params.id);

        // 1️⃣ Check if product already in cart
        const [existing] = await db.query(
            "SELECT * FROM cart WHERE userID = ? AND productId = ?",
            [userID, productId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Product already in cart" });
        }

        // 2️⃣ Fetch product details
        const [products] = await db.query(
            "SELECT * FROM products WHERE productId = ?",
            [productId]
        );

        if (products.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = products[0];

        // 3️⃣ Insert into cart
        await db.query(
            `INSERT INTO cart 
       (userID, productId, productName, productPrice, productImage, productDescription, quantity)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userID,
                product.productId,
                product.productName,
                product.productPrice,
                product.productImage,
                product.productDescription,
                1
            ]
        );

        res.status(201).json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= INCREASE QUANTITY =================
cartRouter.put("/cart/add/:id", authN, authUserAdmin, async (req, res) => {
    try {
        const userID = req.userID;
        const productId = parseInt(req.params.id);

        const [cartItems] = await db.query(
            "SELECT quantity FROM cart WHERE userID = ? AND productId = ?",
            [userID, productId]
        );

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        const newQuantity = cartItems[0].quantity + 1;

        await db.query(
            "UPDATE cart SET quantity = ? WHERE userID = ? AND productId = ?",
            [newQuantity, userID, productId]
        );

        res.status(200).json({ message: "Quantity increased" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= DECREASE / DELETE =================
cartRouter.put("/cart/delete/:id", authN, authUserAdmin, async (req, res) => {
    try {
        const userID = req.userID;
        const productId = parseInt(req.params.id);

        const [cartItems] = await db.query(
            "SELECT quantity FROM cart WHERE userID = ? AND productId = ?",
            [userID, productId]
        );

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        if (cartItems[0].quantity > 1) {
            await db.query(
                "UPDATE cart SET quantity = quantity - 1 WHERE userID = ? AND productId = ?",
                [userID, productId]
            );
            return res.status(200).json({ message: "Quantity decreased" });
        }

        // quantity === 1 → delete
        await db.query(
            "DELETE FROM cart WHERE userID = ? AND productId = ?",
            [userID, productId]
        );

        res.status(200).json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= GET CART =================
cartRouter.get("/cart", authN, authUserAdmin, async (req, res) => {
    try {
        const userID = req.userID;

        const [cartItems] = await db.query(
            "SELECT * FROM cart WHERE userID = ?",
            [userID]
        );

        if (cartItems.length === 0) {
            return res.status(200).json({ message: "Your cart is empty" });
        }

        res.status(200).json({ cartItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = cartRouter;




//FOR MONGODB CART ROUTER

// const express = require('express');
// const cartRouter = express.Router();
// const cartProduct = require('../Model/CartModel')
// const Products = require('../Model/ProductModel');
// const authN = require('../Middleware/authN');
// const authUserAdmin = require("../Middleware/authUserAdmin")


// cartRouter.post("/cart/add/:id", authN, authUserAdmin, async (req, res) => {
//     try {



//         const presentInCart = await cartProduct.findOne({ productId: parseInt(req.params.id), userID: req.userID })


//         if (!presentInCart) {
//             const { productName, productId, productPrice, productImage, productDescription } = await Products.findOne({ productId: parseInt(req.params.id) })

//             const userID = req.userID;
//             const quantity = 1;

//             const newAddCart = new cartProduct({ userID, quantity, productName, productId, productPrice, productImage, productDescription });
//             await newAddCart.save()
//             return res.status(201).json({ message: "add this product successfully in your cart" })
//         }
//         res.status(404).json({ message: "cann't add multiple times" })

//     }
//     catch (err) {
//         res.status(404).json({ error: err.message })
//     }

// });

// cartRouter.put("/cart/add/:id", authN, authUserAdmin, async (req, res) => {
//     try {
//         const { userID, quantity, productName, productId, productPrice, productImage, productDescription } = await cartProduct.findOne({ productId: parseInt(req.params.id), userID: req.userID });

//         const newQuantity = quantity + 1;
//         const updateCartProduct = await cartProduct.findOneAndUpdate({ productId: parseInt(req.params.id), userID: req.userID }, { userID, quantity: newQuantity, productName, productId, productPrice, productImage, productDescription })
//         if (!updateCartProduct) {
//             return res.status(201).json({ message: "product couldn't update" })
//         }
//         const product = await cartProduct.findOne({ productId: parseInt(req.params.id), userID: req.userID })
//         res.status(201).json({ message: "add this product successfully in your cart", product })
//     }



//     catch (err) {
//         res.status(404).json({ error: "cann't found this product in cart" })
//     }

// })



// cartRouter.delete("/cart/delete/:id", authN, authUserAdmin, async (req, res) => {
//     try {
//         const { userID, quantity, productName, productId, productPrice, productImage, productDescription } = await cartProduct.findOne({ productId: parseInt(req.params.id), userID: req.userID });

//         if (quantity === 1) {
//             const deleteById = await cartProduct.findOneAndDelete({ productId: parseInt(req.params.id) })
//             return res.status(201).json({ message: "this product is deleted from your Cart" })
//         }



//         res.status(201).json({ message: "this product cann't deleted " })
//     }
//     catch (err) {
//         return res.status(404).json({ message: "this product is not in your cart" })
//     }
// })


// cartRouter.put("/cart/delete/:id", authN, authUserAdmin, async (req, res) => {
//     try {
//         const { userID, quantity, productName, productId, productPrice, productImage, productDescription } = await cartProduct.findOne({ productId: parseInt(req.params.id), userID: req.userID });


//         if (quantity > 1) {
//             const newQuantity = quantity - 1;
//             const updateCartProduct = await cartProduct.findOneAndUpdate({ productId: parseInt(req.params.id) }, { userID, quantity: newQuantity, productName, productId, productPrice, productImage, productDescription })

//             return res.status(201).json({ message: "product is deleted in your cart" })
//         }

//         res.status(201).json({ message: "product couldn't deleted" })

//     }

//     catch (err) {
//         res.status(404).json({ error: "cann't delete this product in cart" })
//     }

// })


// cartRouter.get("/cart", authN, authUserAdmin, async (req, res) => {
//     try {
//         const userID = req.userID;
//         const userCart = await cartProduct.find({ userID });

//         if (userCart.length === 0) {
//             return res.status(201).json({ message: "your cart is Empty" })
//         }
//         res.status(201).json({ message: "your cart ", userCart })
//     }
//     catch (err) {
//         res.status(201).json({ error: err.message })
//     }
// })




// module.exports = cartRouter;