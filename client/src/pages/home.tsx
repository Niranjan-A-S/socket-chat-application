import { FC, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../context/auth';

export const HomePage: FC = memo(() => {
    const { token, user } = useAuthInfo();
    return <Navigate to={(token && user) ? '/chat' : '/login'} />;
});
