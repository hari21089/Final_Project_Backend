const router = require("express").Router();
const Review = require("../models/Review");

router.post("/", async (req, res) => {
    const data = await Review.create(req.body);
    res.json(data);
});

router.get("/", async (req, res) => {
    const reviews = await Review.find().sort({ _id: -1 });
    res.json(reviews);
});

module.exports = router;