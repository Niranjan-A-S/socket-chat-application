import { RequestHandler } from 'express';

export const registerUser: RequestHandler = async (req, res) => {
    const { username, email, password } = req.body;
};

export const loginUser: RequestHandler = async (req, res) => res.send('Login User');
