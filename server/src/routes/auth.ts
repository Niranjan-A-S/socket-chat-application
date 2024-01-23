import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth';
import { userRegisterValidator, validate } from '../validators/auth';

const authRouter = Router();

authRouter.route('/register').post(userRegisterValidator, validate, registerUser);
authRouter.route('/login').post(loginUser);

export { authRouter };
