import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth';

const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);

export { authRouter };
