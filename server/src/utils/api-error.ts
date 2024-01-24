import { Messages } from '../constants/messages';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class APIError extends Error {
    success: boolean;
    statusCode: number;
    data: null | any;
    errors: any[];

    constructor(
        statusCode: number,
        message: string = Messages.COMMON_ERROR_MESSAGE,
        errors = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
