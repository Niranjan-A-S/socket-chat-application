import { FC, InputHTMLAttributes, memo, useCallback, useMemo } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useFormState } from '../hooks/use-form-state';
import { IUser } from '../types';

const defaultValue: IUser = {
    email: '',
    password: '',
    username: ''
};

export const RegisterPage: FC = memo(() => {

    const { formState: { email, password, username }, onChange } = useFormState<IUser>(defaultValue);

    const inputFieldsMetaData = useMemo<InputHTMLAttributes<HTMLInputElement>[]>(() => [
        { placeholder: 'Email', type: 'email', name: 'email', value: email },
        { placeholder: 'Username', type: 'username', name: 'username', value: username },
        { placeholder: 'Password', type: 'password', name: 'password', value: password }
    ], [email, password, username]);

    const renderInputField = useCallback(({ placeholder, type, value, name }: InputHTMLAttributes<HTMLInputElement>) =>
        <Input
            key={name}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />, [onChange]);

    return (<div className="flex justify-center items-center flex-col h-screen w-screen">
        <h1 className="text-3xl font-bold">Chat Application</h1>
        <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
            <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
                <LockClosedIcon className="h-8 w-8 mb-2" /> Register
            </h1>
            {inputFieldsMetaData.map(renderInputField)}
            <Button fullWidth>Register </Button>
            <small className="text-zinc-300">
                Already have an account?{' '}
                <a className="text-primary hover:underline" href="/login">
                    Login
                </a>
            </small>
        </div>
    </div>);
});
