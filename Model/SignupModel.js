const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
})

const signupModel = mongoose.model('signup', signupSchema)


module.exports = signupModel;