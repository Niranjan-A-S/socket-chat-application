/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error';

export const userRegisterValidator = [
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email is invalid.'),
    body('username').trim().notEmpty().withMessage('Username is required.').isLowercase().withMessage('Username must be lowercase.').isLength({ min: 3 }).withMessage('Username must be at lease 3 characters long.'),
    body('password').trim().notEmpty().withMessage('Password is required.')
];

export const validate: RequestHandler = (req, _res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any = [];
    errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }));

    throw new ApiError(422, 'Received data is not valid.', extractedErrors);
};
