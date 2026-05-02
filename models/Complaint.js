const mongoose = require("mongoose");

module.exports =
    mongoose.model(
        "Complaint",
        {
            name: String,
            phone: String,
            complaint: String
        }
    )