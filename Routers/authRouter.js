const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Signup = require("../Model/SignupModel")

authRouter.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address, role } = req.body
        const newPassword = await bcrypt.hash(password, 8)
        const newUser = new Signup({ username, email, password: newPassword, address, role })
        await newUser.save()
        res.status(201).json({ message: "signup successfully", newUser })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const isUser = await Signup.findOne({ username });
        if (!isUser) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPassword = await bcrypt.compare(password, isUser.password);
        if (!isPassword) {
            return res.status(404).json({ message: "password is not matched" })
        }
        const token = jwt.sign(
            { username: isUser.username, role: isUser.role },
            'my_secret_rajkishordas09',
            { expiresIn: '1d' }
        )
        res.status(201).json({ mnessage: "login Successfully", token })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
})




module.exports = authRouter;
