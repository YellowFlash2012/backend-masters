import asyncHandler from 'express-async-handler'
import User from '../../models/User.js';

// @desc    User signup
// @route   POST /api/v1/users
// @access  Public
export const userSignup = asyncHandler(async (req, res) => {
    const { name, email, password,role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const token = await user.createJWT();

    res.status(201).json({ success: true, user, token });
})

// @desc    User login
// @route   POST /api/v1/users/login
// @access  Public
export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email||!password) {
        throw new Error("Thsoe fields are required!")
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new Error('Invalid credentials!')
    }

    const isMatch = await user.matchPw(password);

    if (!isMatch) {
        throw new Error("Invalid credentials!")
    }

    const token = await user.createJWT();

    res.status(200).json({success:true, user, token});
})