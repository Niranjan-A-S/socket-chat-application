import { LockClosedIcon } from '@heroicons/react/20/solid';
import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IParentProps } from '../types';

export const FormBody: FC<IParentProps> = memo(({ children }) => {

    const { pathname } = useLocation();
    const isLoginForm = useMemo(() => pathname === '/login', [pathname]);
    const footer = useMemo(() => (isLoginForm
        ? <>
            Don&apos;t have an account?{' '}
            <a href='/register'>
                Register
            </a>
        </>
        : <>
            Already have an account?{' '}
            <a href="/login">
                Login
            </a>
        </>
    ), [isLoginForm]);

    return <div>
        <h1>Chat Application</h1>
        <div>
            <h1>
                <LockClosedIcon /> {isLoginForm ? 'Login' : 'Register'}
            </h1>
            {children}
            <small>
                {footer}
            </small>
        </div>
    </div>;
});
