const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

const auth = require("../middleware/auth");       // ✅ path adjust panniko
const admin = require("../middleware/admin");     // ✅ path adjust panniko



router.get("/", async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});



router.post("/add", auth, admin, async (req, res) => {
    try {

        const { name, price, img, category } = req.body;

        const newFood = await Food.create({
            name,
            price,
            img,
            category
        });

        res.json(newFood);

    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding food");
    }
});

module.exports = router;