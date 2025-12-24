//FOR MYSQL DB AUTHENTICATION

const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db-client"); // ✅ MySQL pool

// ======================= SIGNUP =======================
authRouter.post("/signup", async (req, res) => {
    try {
        const { username, email, password, address, role } = req.body;

        // 1️⃣ Check if user already exists
        const [existingUser] = await db.query(
            "SELECT id FROM signup WHERE username = ? OR email = ?",
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // 3️⃣ Insert into MySQL
        await db.query(
            `INSERT INTO signup (username, email, password, address, role)
       VALUES (?, ?, ?, ?, ?)`,
            [username, email, hashedPassword, address, role || "user"]
        );

        res.status(201).json({ success: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================= LOGIN =======================
authRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1️⃣ Fetch user from MySQL
        const [users] = await db.query(
            "SELECT * FROM signup WHERE username = ?",
            [username]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = users[0];

        // 2️⃣ Compare password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // 3️⃣ Generate JWT
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = authRouter;




//FOR MONGO DB AUTHENTICATION

// const express = require('express')
// const authRouter = express.Router()
// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken")
// const Signup = require("../Model/SignupModel")

// authRouter.post("/signup", async (req, res) => {

//     try {
//         const { username, email, password, address, role } = req.body;
//         const newPassword = await bcrypt.hash(password, 8);
//         const newSignup = new Signup({ username, email, password: newPassword, address, role });
//         await newSignup.save();
//         res.status(201).json({ success: "signup successfully", newSignup })
//     }
//     catch (errer) {
//         res.status(404).json({ err: errer.message })
//     }
// })

// authRouter.post("/login", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const isUser = await Signup.findOne({ username });
//         if (!isUser) {
//             return res.status(404).json({ message: "user not found" })
//         }
//         const isPassword = await bcrypt.compare(password, isUser.password);
//         if (!isPassword) {
//             return res.status(404).json({ message: "wrong password" });

//         }

//         const token = jwt.sign(
//             { username: isUser.username, role: isUser.role, userId: isUser._id },
//             'my_secret_rajkishordas09',
//             { expiresIn: '1d' }
//         )
//         res.status(200).json({ message: "login successfully", token })
//     }
//     catch (err) {
//         res.status(404).json({ error: err.message })
//     }
// })




// module.exports = authRouter;
