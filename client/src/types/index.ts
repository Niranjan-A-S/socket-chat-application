/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { Dispatch, ReactNode, SetStateAction } from 'react';

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

export interface IRequestHandlerParams<T> {
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    request(): Promise<AxiosResponse<ISuccessResponse<T>, any>>
    onSuccess(data: ISuccessResponse<T>): void;
    onError(error: any): void;
}

export interface ILoginResponse {
    user: IUser;
    accessToken: string;
}
