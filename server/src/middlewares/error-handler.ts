/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction } from 'express';
import { APIError } from '../utils/api-error';
import mongoose from 'mongoose';
import { Messages } from '../constants/messages';

export const errorHandler: ErrorRequestHandler = (
    err,
    _req,
    res,
    _next
) => {
    let error = err;

    if (!(error instanceof APIError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 400;
        const message = error.message || Messages.COMMON_ERROR_MESSAGE;
        error = new APIError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {})
    };

    //TODO Implement multer ...
    return res.status(error.statusCode).json(response);
};
