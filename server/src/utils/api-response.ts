import { Messages } from '../constants/messages';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class APIResponse {
    statusCode: number;
    message: string;
    data: any;
    success: boolean;
    constructor(statusCode: number, message: string = Messages.SUCCESS, data: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}
