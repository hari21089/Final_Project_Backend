const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send("No token");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send("Invalid token");
    }
};


// 👤 GET USER DETAILS
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});


// ❌ DELETE ACCOUNT
router.delete("/delete", auth, async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.send("Account deleted");
});

module.exports = router;