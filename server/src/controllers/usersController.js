import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const emailExists = await User.findOne({ email });
        const phoneExists = await User.findOne({ phone });

        if (emailExists) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        if (phoneExists) {
            return res.status(400).json({ message: "User with this phone number already exists" });
        }

        const user = await User.create({ name, email, password, phone });
        const token = generateToken(user);

        res.status(201).json({ user: sanitizeUser(user), token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            user: sanitizeUser(user),
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

const sanitizeUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}