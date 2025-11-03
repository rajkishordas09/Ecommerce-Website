const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productId: { type: Number, unique: true, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String, required: true },
    productDescription: { type: String, required: true }
})
const productModel = mongoose.model('product', productSchema);
module.exports = productModel