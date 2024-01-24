import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IParentProps } from '../types';

export const FormBody: FC<IParentProps> = memo(({ children }) => {

    const { pathname } = useLocation();
    const isLoginForm = useMemo(() => pathname === '/login', [pathname]);
    const footer = useMemo(() => (isLoginForm
        ? <>
            Don&apos;t have an account?{' '}
            <a href="/register" className="nav-link">
                Register
            </a>
        </>
        : <>
            Already have an account?{' '}
            <a href="/login" className="nav-link">
                Login
            </a>
        </>
    ), [isLoginForm]);

    return <div className="container">
        <h1>Chat Application</h1>
        <div className="form-container">
            <h1 className="form-heading">
                {isLoginForm ? 'Login' : 'Register'}
            </h1>
            {children}
            <small>
                {footer}
            </small>
        </div>
    </div>;
});
