const router = require("express").Router();

const Complaint =
    require("../models/Complaint");

router.post("/", async (req, res) => {

    await Complaint.create(req.body);

    res.send("ticket stored");

})

module.exports = router;