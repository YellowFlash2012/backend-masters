import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    req.headers.authorization

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new Error("Not authorized to access this resource!");
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);

    req.user = await User.findById(decoded.id);

    next()

    if (!decoded) {
        throw new Error("Invalid credentials!");
    }
})

export const admin = (req, res, next) => {
    if (req.user && req.user.publisher) {
        next();
    } else {
        res.status(401);
        throw new Error("Only the Admin can do that!");
    }
};