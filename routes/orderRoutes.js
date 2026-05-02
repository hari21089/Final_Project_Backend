const express = require("express");
const router = express.Router();

const Order = require("../models/Order");



/* create order */
router.post(
    "/",
    async (req, res) => {
        try {

            const order =
                await Order.create(
                    req.body
                );

            res.json(order);

        }
        catch (err) {
            res.status(500).json(err);
        }
    }
);



/* get all orders */
router.get(
    "/",
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
            res.status(500).json(err);
        }
    }
);



/* cancel order */
router.put(
    "/cancel/:id",
    async (req, res) => {

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: "Cancelled"
            }
        );

        res.json({
            message: "Cancelled"
        });

    }
);



/* delete order */
router.delete(
    "/:id",
    async (req, res) => {

        try {

            await Order.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message: "Order Deleted"
            });

        }
        catch (err) {

            res.status(500).json(err);

        }

    }
);



module.exports = router;