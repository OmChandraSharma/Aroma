const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up
router.post("/signup", async (req, res) => {
    const { name, email, password , phone } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword ,phone});

        await newUser.save();
        res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email,phone: user.phone } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
