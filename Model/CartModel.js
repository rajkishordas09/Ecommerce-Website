const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    productName: { type: String, required: true },
    productId: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String, required: true },
    productDescription: { type: String, required: true }
})
const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel