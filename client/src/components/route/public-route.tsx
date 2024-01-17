import { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../../context/auth';
import { IParentProps } from '../../types';

export const PublicRoute: React.FC<IParentProps> = memo(({ children }) => {
    const { token, user } = useAuthInfo();

    return (token && user?._id) ? <Navigate to="/chat" replace /> : children;
});
