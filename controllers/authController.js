const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();


      

        const link = `https://golden-sawine-519283.netlify.app/reset-password/${token}`;

     await transporter.sendMail({
    to: email,
    subject: "Reset Password",
    html: `<a href="${link}">Click here to reset password</a>`
});

        res.json({ msg: "Mail sent" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error sending mail" });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ msg: "Invalid link" });

        const hashed = await bcrypt.hash(password, 10);

        user.password = hashed;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({ msg: "Password updated" });

    } catch (err) {
        res.status(500).json({ msg: "Error" });
    }
};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    res.json({ token });
};
