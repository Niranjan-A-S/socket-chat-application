import { ReactNode } from 'react';

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
}

export interface IAuthContext {
    user: IUser | null;
    token: string | null;
    login(payload: Omit<IUser, 'email'>): Promise<void>;
    register(payload: IUser): Promise<void>;
    logout(): Promise<void>;
}

export interface ISuccessResponse<T> {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
}

export interface IParentProps {
    children: ReactNode
}
