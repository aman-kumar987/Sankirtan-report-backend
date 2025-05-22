import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res, next) => {
    try {
        const { name, mobileNumber, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ mobileNumber });
        if(existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists"
            });
        }


        // Creating a new user
        const newUser = await User.create({ name, mobileNumber, password });
        
        if(!newUser) {
            return res.status(400).json({
                status: "fail",
                message: "User registration failed"
            });
        }

        const user = await User.find({ mobileNumber }).select("-password -_id -__v -createdAt -updatedAt");
        if(!user) {
            return res.status(400).json({
                status: "fail",
                message: "User not found"
            });
        }

        return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { mobileNumber, password } = req.body;

        // Check if the user exists
        const existingUser = await User.findOne({ mobileNumber });
        if(!existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "User not found"
            });
        }

        // Check if the password is correct
        const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
        if(!isPasswordCorrect) {
            return res.status(400).json({
                status: "fail",
                message: "Incorrect password"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        return res.status(200)
        .cookie("token", token, {
            httpOnly: true
        })
        .json({
            status: "success",
            message: "User logged in successfully",
            token: token
        });
    } catch (error) {
        next(error);
    }
}

export {
    registerUser,
    loginUser
}