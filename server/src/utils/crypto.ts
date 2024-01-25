/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const getHashedString = (string: string) => crypto
    .createHash('sha256')
    .update(string)
    .digest('hex');

export const hashPassword = async (password: string, salt: number = 10) => await bcrypt.hash(password, salt);
export const comparePassword = async (password: string, passwordToCompare: string) => await bcrypt.compare(password, passwordToCompare);

export const getJWT = (
    payload: any,
    secretOrPrivateKey: any,
    options?: any
) => jwt.sign(payload, secretOrPrivateKey, options);
