const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER USER =================
const registerUser = async (req, res) => {

    try {

        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        console.log("REGISTER API HIT");
        console.log("EMAIL:", email);

        // VALIDATION
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // CHECK EXISTING USER
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log("USER SAVED:", user._id);

        return res.status(201).json({
            message: "Registration Successful"
        });

    } catch (error) {

        console.log("REGISTER ERROR:", error.message);

        return res.status(500).json({
            message: error.message
        });
    }
};


// ================= LOGIN USER =================
const loginUser = async (req, res) => {

    try {

        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        console.log("LOGIN API HIT");
        console.log("EMAIL:", email);

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // FIND USER
        const user = await User.findOne({ email });

        console.log("USER FOUND:", user);

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error.message);

        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};