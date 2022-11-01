
import asyncHandler from 'express-async-handler'
import crypto from "crypto"

import User from '../../models/User.js';
import { sendEmail } from '../../utils/sendmail.js';

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

    res.status(201).json({ success: true, user:{id:user._id,name:user.name,email:user.email,role:user.role}, token });
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

    res.status(200).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    });
})

// ***create cookie
const sendCookie = async (user, statusCode, res) => {
    const token = await user.createJWT();

    const options = {
        expires: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV==="production") {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({success:true,token})
}

// @desc    Forgot password
// @route   POST /api/v1/users/forgot-pw
// @access  Public
export const forgotPw = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new Error("User with that email as not found!")
    }

    // get reset token
    const resetToken = user.getPwResetToken();

    await user.save({ validateBeforeSave: false });

    // create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset-pw/${resetToken}`;

    const message = "You are receiving this email because you or someone else requested to reset the password. If you didn't make this request, kindly ignore this email";

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset email',
            message
        })

        res.status(200).json({
            success: true,
            data: "Email dispatched",
        });
    } catch (error) {
        user.pwResetToken = undefined;
        user.pwResetTokenExpire = undefined;

        await user.save({ validateBeforeSave: false });

        throw new Error("Email could NOT be sent!")
    }

    res.status(200).json({
        success: true,
        data:user
    })
})

// @desc    reset password
// @route   PUT /api/v1/users/reset-pw/:resettoken
// @access  Private
export const resetPw = asyncHandler( async (req, res) => {
    // get hashed token
    const pwResetToken = crypto
        .createHash("sha256")
        .update(req.params.resettoken)
        .digest("hex");

    const user = await User.findOne({
        pwResetToken,
        pwResetTokenExpire:{$gt:Date.now()},
    });

    if (!user) {
        throw new Error("Invalid token!")
    }

    // set new pw
    user.password = req.body.password;
    user.pwResetToken = undefined;
    user.pwResetTokenExpire = undefined;

    await user.save()

    res.status(201).json({
        success: true,
    });
})

// @desc    update user details
// @route   PUT /api/v1/users
// @access  Private
export const updateUserDetails = asyncHandler(async (req, res) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators:true
    });

    res.status(201).json({
        success: true,
        data: "User details were updated!",
    });
})

// @desc    update user password
// @route   PUT /api/v1/users/update-pw
// @access  Private
export const updateUserPw = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.matchPw(req.body.currentPw))) {
        throw new Error("Incorrect Password");
    }

    user.password = req.body.newPassword;

    await user.save()

    res.status(201).json({
        success: true,
        data:"Password was updated!"
    });
})