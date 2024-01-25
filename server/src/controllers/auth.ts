/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { MAIL_SUBJECT } from '../constants/mail';
import { Messages } from '../constants/messages';
import { User } from '../models/user';
import { IRegisterRequest } from '../types/api';
import { APIError } from '../utils/api-error';
import { APIResponse } from '../utils/api-response';
import { getHashedString } from '../utils/crypto';
import { emailVerificationMailgenContent, getVerificationUrl, sendMail } from '../utils/mail';
import { AVAILABLE_SOCIAL_LOGINS } from '../constants/db';

const generateAccessAndRefreshTokens = async (userId: any) => {
    try {
        const user = await User.findById(userId) as any;

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new APIError(
            500,
            Messages.ACCESS_TOKEN_ERROR
        );
    }
};

export const registerUser = asyncHandler(async (req: IRegisterRequest, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) {
        throw new APIError(409, Messages.DUPLICATE_USER, []);
    }

    const user: any = new User({ email, password, username });

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendMail({
        email: user?.email,
        subject: MAIL_SUBJECT,
        mailgenContent: emailVerificationMailgenContent(
            user?.username,
            getVerificationUrl(req, unHashedToken)
        )
    });

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
    );
    if (!createdUser) throw new APIError(500, Messages.USER_REGISTRATION_FAILED);

    res
        .status(201)
        .json(new APIResponse(
            200,
            Messages.USER_REGISTRATION_SUCCESSFUL,
            { user: createdUser }
        ));
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;
    if (!verificationToken) throw new APIError(400, Messages.EMAIL_VERIFICATION_TOKEN_MISSING);

    const hashedToken = getHashedString(verificationToken);

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() }
    });

    if (!user) throw new APIError(489, Messages.INVALID_EMAIL_VERIFICATION_TOKEN);

    user.emailVerificationExpiry = undefined;
    user.emailVerificationToken = undefined;
    user.isEmailVerified = true;

    await user.save({ validateBeforeSave: false });
    res
        .status(201)
        .json(new APIResponse(
            200,
            Messages.EMAIL_VERIFIED,
            { isEmailVerified: true }));
});

export const loginUser: RequestHandler = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    //This is intentional to support multiple incoming login request which might use username or email
    if (!username && !email) throw new APIError(400, Messages.USER_CREDENTIALS_REQUIRED);

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (!user) throw new APIError(404, Messages.USER_NOT_FOUND);

    if (user.loginType !== AVAILABLE_SOCIAL_LOGINS.EMAIL_PASSWORD) throw new APIError(
        400,
        'You have previously registered using ' +
        user.loginType?.toLowerCase() +
        '. Please use the ' +
        user.loginType?.toLowerCase() +
        ' login option to access your account.'
    );

    const isPasswordValid = await (user as any).isPasswordCorrect(password);
    if (!isPasswordValid) throw new APIError(401, Messages.INVALID_CREDENTIALS);

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
    );

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res
        .status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(
            new APIResponse(
                200,
                Messages.USER_LOGIN_SUCCESSFUL,
                { user: loggedInUser, accessToken, refreshToken }
            )
        );
});
