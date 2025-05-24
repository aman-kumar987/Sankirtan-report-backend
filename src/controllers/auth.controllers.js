import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';


const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map(error => error.msg).join('\n');
            return res.status(400).json({
                status: "fail",
                message
            });
        }

        const { firstName, lastName, mobileNumber, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ mobileNumber });
        if(existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists"
            });
        }


        // Creating a new user
        const newUser = await User.create({ firstName, lastName, mobileNumber, password });
        
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
        res.status(500).json({
            status: "failure",
            message: "Failed registering a user"
        })
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
        const token = jwt.sign({ 
            id: existingUser._id,
            role: existingUser.role,
            firstName: existingUser.firstName
         }, process.env.JWT_SECRET);

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
        res.status(500).json({
            status: "failure",
            message: "Login failed"
        })
    }
}

const getUserRole = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "User role fetched successfully",
            data: {
                role: req.user.role,
                firstName: req.user.firstName
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Failed fetching user role"
        });
    }
}

export {
    registerUser,
    loginUser,
    getUserRole
}