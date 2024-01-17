import { LockClosedIcon } from '@heroicons/react/20/solid';
import { FC, InputHTMLAttributes, memo, useCallback, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useFormState } from '../hooks/use-form-state';
import { IUser } from '../types';

const defaultValue: IUser = {
    email: '',
    password: '',
    username: ''
};

export const LoginPage: FC = memo(() => {

    const { formState, onChange } = useFormState<Omit<IUser, 'email'>>(defaultValue);
    const { password, username } = useMemo(() => formState, [formState]);

    const inputFieldsMetaData = useMemo<InputHTMLAttributes<HTMLInputElement>[]>(() => [
        { placeholder: 'Username', type: 'username', name: 'username', value: username },
        { placeholder: 'Password', type: 'password', name: 'password', value: password }
    ], [password, username]);

    const renderInputField = useCallback(({ placeholder, type, value, name }: InputHTMLAttributes<HTMLInputElement>) =>
        <Input
            key={name}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />, [onChange]);

    return (
        <div className="flex justify-center items-center flex-col h-screen w-screen">
            <h1 className="text-3xl font-bold">FreeAPI Chat App</h1>
            <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
                <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
                    <LockClosedIcon className="h-8 w-8 mb-2" /> Login
                </h1>
                {inputFieldsMetaData.map(renderInputField)}
                <Button
                    disabled={Object.values(formState).some((val) => !val)}
                    fullWidth
                >
                    Login
                </Button>
                <small className="text-zinc-300">
                    Don&apos;t have an account?{' '}
                    <a className="text-primary hover:underline" href="/register">
                        Register
                    </a>
                </small>
            </div>
        </div>
    );
});
