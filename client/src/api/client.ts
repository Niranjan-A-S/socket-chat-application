import axios from 'axios';
import { IUser } from '../types';

const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    timeout: 120000
});

export const loginUser = async (data: Omit<IUser, 'email' | '_id'>) => await ApiClient.post('/auth/login', data);
export const registerUser = async (data: Omit<IUser, '_id'>) => await ApiClient.post('/auth/register', data);
