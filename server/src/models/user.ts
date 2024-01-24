import { Schema, model } from 'mongoose';
import { AVAILABLE_SOCIAL_LOGINS, AVATAR_LOCAL_PATH, AVATAR_PLACEHOLDER, AvailableRoles } from '../constants/db';
import { Messages } from '../constants/messages';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, USER_TEMPORARY_TOKEN_EXPIRY } from '../constants/auth';


const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String
            },
            default: {
                url: AVATAR_PLACEHOLDER,
                localPath: AVATAR_LOCAL_PATH
            }
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, Messages.PASSWORD_REQUIRED]
        },
        role: {
            type: String,
            required: true,
            default: AvailableRoles.USER,
            enum: AvailableRoles
        }, loginType: {
            type: String,
            enum: AVAILABLE_SOCIAL_LOGINS,
            default: AVAILABLE_SOCIAL_LOGINS.EMAIL_PASSWORD
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshToken: String,
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
        emailVerificationToken: String,
        emailVerificationExpiry: Date
    }
    , { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET || REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString('hex');

    const hashedToken = crypto
        .createHash('sha256')
        .update(unHashedToken)
        .digest('hex');

    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = model('User', userSchema);
