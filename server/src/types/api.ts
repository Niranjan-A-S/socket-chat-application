import { Request } from 'express';

interface IRegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

export interface IRegisterRequest extends Request {
    body: IRegisterRequestBody;
}
