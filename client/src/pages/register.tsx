import { FC, memo } from 'react';
import { PublicRoute } from '../components/route/public-route';
import { RegisterContainer } from '../containers/register';

export const RegisterPage: FC = memo(() => (
    <PublicRoute>
        <RegisterContainer />
    </PublicRoute>
));
