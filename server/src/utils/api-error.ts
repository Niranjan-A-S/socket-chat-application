/* eslint-disable @typescript-eslint/no-explicit-any */

const writeValidationLogs = (errors: any[]) => {
    for (const error of errors) {
        console.error(...Object.values(error));
    }
};

export class ApiError extends Error {
    success: boolean;
    statusCode: number;
    data: null;
    errors: any[];

    constructor(statusCode: number, message = 'Something went wrong!', errors = [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        writeValidationLogs(errors);
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
