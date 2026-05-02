const Order = require("../models/Order");

exports.createOrder =
    async (req, res) => {

        try {

            const order =
                await Order.create(
                    req.body
                );

            res.status(201).json({
                message:
                    "Order placed",
                order
            });

        }

        catch (err) {

            res.status(500).json({
                message:
                    "Server Error"
            });

        }

    };



exports.getOrders =
    async (req, res) => {

        try {

            const orders =
                await Order.find()
                    .sort({
                        createdAt: -1
                    });

            res.json(
                orders
            );

        }

        catch (err) {

            res.status(500).json({
                message:
                    "Error fetching orders"
            });

        }

    };