/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { MAIL_SUBJECT } from '../constants/mail';
import { Messages } from '../constants/messages';
import { User } from '../models/user';
import { IRegisterRequest } from '../types/api';
import { APIError } from '../utils/api-error';
import { APIResponse } from '../utils/api-response';
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

    res.status(201).json(new APIResponse(
        200,
        Messages.USER_REGISTRATION_SUCCESSFUL,
        { user }
    ));
});

export const loginUser: RequestHandler = async (req, res) => res.send('Login User');
