import { ReactNode, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../../context/auth';

export const PublicRoute: React.FC<{ children: ReactNode }> = memo(({ children }) => {
    const { token, user } = useAuthInfo();

    return (token && user?._id) ? <Navigate to="/chat" replace /> : children;
});
