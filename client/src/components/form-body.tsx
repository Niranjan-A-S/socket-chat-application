import { LockClosedIcon } from '@heroicons/react/20/solid';
import { FC, ReactNode, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const FormBody: FC<{ children: ReactNode }> = memo(({ children }) => {

    const { pathname } = useLocation();
    const isLoginForm = useMemo(() => pathname === '/login', [pathname]);
    const footer = useMemo(() => (isLoginForm
        ? <>
            Don&apos;t have an account?{' '}
            <a className="text-primary hover:underline" href='/register'>
                Register
            </a>
        </>
        : <>
            Already have an account?{' '}
            <a className="text-primary hover:underline" href="/login">
                Login
            </a>
        </>
    ), [isLoginForm]);

    return <div className="flex justify-center items-center flex-col h-screen w-screen">
        <h1 className="text-3xl font-bold">Chat Application</h1>
        <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
            <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
                <LockClosedIcon className="h-8 w-8 mb-2" /> {isLoginForm ? 'Login' : 'Register'}
            </h1>
            {children}
            <small className="text-zinc-300">
                {footer}
            </small>
        </div>
    </div>;
});
