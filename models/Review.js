const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: String
});

module.exports = mongoose.model("Review", reviewSchema);