import { FC, memo } from 'react';
import { PublicRoute } from '../components/route/public-route';
import { LoginContainer } from '../containers/login';

export const LoginPage: FC = memo(() => (
    <PublicRoute>
        <LoginContainer />
    </PublicRoute>
));
