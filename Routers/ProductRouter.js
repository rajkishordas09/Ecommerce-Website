const express = require('express')
const router = express.Router()
const Products = require('../Model/ProductModel');
const authN = require('../Middleware/authN');
const authAdminOnly = require("../Middleware/authAdminOnly")
const authUserAdmin = require("../Middleware/authUserAdmin")
router.post("/product", authN, authAdminOnly, async (req, res) => {
    try {
        const product = req.body
        const newProduct = new Products(product);
        await newProduct.save();
        res.status(201).json({ message: "product add Successfully", newProduct })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
});


router.get("/products", authN, authUserAdmin, async (req, res) => {
    try {
        const { name, id } = req.query;

        if (name) {
            const products = await Products.find({ productName: name })
            if (products.length === 0) {
                return res.status(404).json({ error: "This Product  is not found" })
            }
            return res.status(201).json({ message: "Product name fetch successfully", products })
        }
        else if (id) {
            const product = await Products.findOne({ productId: parseInt(id) })
            if (!product) {
                return res.status(404).json({ error: "This Product  is not found" })
            }
            return res.status(201).json({ message: "Product id fetch successfully", product })
        }



        const products = await Products.find();//return a empty array if not created product

        if (products.length === 0) {
            return res.status(201).json({ message: "Empty, No product is there " })
        }
        res.status(201).json({ message: "All products fetch Successfully", products })


    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }

})

router.get("/products/name/:name", authN, authUserAdmin, async (req, res) => {
    try {
        const productsByName = await Products.find({ productName: req.params.name });//return a empty array if not match
        if (productsByName.length === 0) {
            res.status(404).json({ error: "product name is not found" })
        }
        res.status(201).json({ message: "products names are fetched successfully", productsByName })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
});



router.get("/products/id/:id", authN, authUserAdmin, async (req, res) => {
    try {
        const productById = await Products.findOne({ productId: parseInt(req.params.id) })//it return null if no id found
        if (!productById) {
            res.status(404).json({ message: "product id is not found" })
        }
        res.status(201).json({ message: "product Id is fatched successfully", productById });
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
})

router.put("/products/update/:id", authN, authAdminOnly, async (req, res) => {
    try {
        const productById = await Products.findOneAndUpdate({ productId: parseInt(req.params.id) }, req.body)
        if (!productById) {
            return res.status(404).json({ message: "product not found" })
        }

        const updatedProduct = await Products.findOne({ productId: parseInt(req.params.id) })

        res.status(201).json({ message: "product update successfully", updatedProduct })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
})


router.delete("/products/delete/:id", authN, authAdminOnly, async (req, res) => {
    try {
        const deleteById = await Products.findOneAndDelete({ productId: parseInt(req.params.id) })
        if (!deleteById) {
            return res.status(404).json({ message: "product not found" })
        }
        res.status(201).json({ message: "product deleted successfully" })
    }

    catch (err) {
        res.status(404).json({ error: err.message })
    }

});

module.exports = router;