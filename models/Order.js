const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true
        },

        email: String,

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        landmark: String,
        pincode: String,

        payment: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Upcoming"
        },

        items: [
            {
                name: String,
                img: String,
                category: String,
                price: Number,
                qty: Number
            }
        ],

        total: Number

    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Order",
        orderSchema
    );