/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/user';
import { APIError } from '../utils/api-error';
import { APIResponse } from '../utils/api-response';
import asyncHandler from 'express-async-handler';
import { IRegisterRequest } from '../types/api';
import { Messages } from '../constants/messages';

export const registerUser = asyncHandler(async (req: IRegisterRequest, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { password }]
    });
    if (existingUser) {
        throw new APIError(409, Messages.DUPLICATE_USER, []);
    }

    const user: any = new User({ email, password, username });

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    res.status(201).json(new APIResponse(
        200,
        Messages.USER_REGISTRATION_SUCCESSFUL,
        { user }
    ));
});

export const loginUser: RequestHandler = async (req, res) => res.send('Login User');
