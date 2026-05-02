const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
    forgotPassword,
    resetPassword
} = require("../controllers/authController");


// 🔁 FORGOT + RESET
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


// 📝 REGISTER
router.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // 🔒 hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        res.send("Registered successfully");

    } catch (err) {
        console.log(err);
        res.status(500).send("Error in register");
    }

});


// 🔐 LOGIN
router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found");
        }

        // 🔑 compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        res.json({
            token,
            role: user.role
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error in login");
    }

});


module.exports = router;