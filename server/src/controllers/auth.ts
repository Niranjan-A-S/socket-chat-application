import { RequestHandler } from 'express';

export const registerUser: RequestHandler = async (req, res) => {
    console.log(req.body);
    return res.send('Register User');
};

export const loginUser: RequestHandler = async (req, res) => res.send('Login User');
