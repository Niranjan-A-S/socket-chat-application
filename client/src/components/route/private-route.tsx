import { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../../context/auth';
import { IParentProps } from '../../types';

export const PrivateRoute: React.FC<IParentProps> = memo(({ children }) => {
    const { token, user } = useAuthInfo();

    return (!token || !user?._id) ? <Navigate to="/login" replace /> : children;
});
