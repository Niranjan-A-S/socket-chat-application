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

export const loginUser: RequestHandler = async (req, res) => res.send('Login User');
