import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default:'user'
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 13,
        select: false
        // select:false so that when we try to access user later on, password will not be part of the user data
    },
    resetPaswordToken: String,
    resetPasswordExpire:Date
}, { timestamps: true });

// ***hashing password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next()
})

// ***creating jwt
userSchema.methods.createJWT=function () {
    return jwt.sign({ id: this._id }, process.env.jwt_secret,{expiresIn:"9d"});
}

// ***compare enteredPw with hashed pw
userSchema.methods.matchPw = async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password);
};

// *** generate and hash pw reset token
userSchema.methods.getPwResetToken=async function () {
    // generate token
    const resetToken = crypto.randomBytes(19).toString('hex');

    // hash token and set to pwResetToken field
    this.pwResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set expire
    this.pwResetTokenExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model("User", userSchema);

export default User;