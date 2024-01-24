/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { APIError } from '../utils/api-error';
import { Messages } from '../constants/messages';

export const userRegisterValidator = [
    body('email').trim().notEmpty().withMessage(Messages.EMAIL_REQUIRED).isEmail().withMessage(Messages.EMAIL_INVALID),
    body('username').trim().notEmpty().withMessage(Messages.USERNAME_REQUIRED).isLowercase().withMessage(Messages.USERNAME_LOWERCASE).isLength({ min: 3 }).withMessage(Messages.USERNAME_LENGTH),
    body('password').trim().notEmpty().withMessage(Messages.PASSWORD_REQUIRED)
];

export const validate: RequestHandler = (req, _res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any = [];
    errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }));

    throw new APIError(422, Messages.INVALID_DATA, extractedErrors);
};
