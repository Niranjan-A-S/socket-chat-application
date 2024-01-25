import { FC, InputHTMLAttributes, memo, useCallback, useMemo } from 'react';
import { FormBody } from '../components/form-body';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useFormState } from '../hooks/use-form-state';
import { IUser } from '../types';
import { useAuthInfo } from '../context/auth';
import { checkIfButtonDisabled } from '../utils';

const defaultValue: IUser = {
    email: 'niranjan0881@gmail.com',
    password: 'Pass@word1',
    username: 'niranjan2602'
};

export const RegisterContainer: FC = memo(() => {

    const { formState, onChange } = useFormState<Omit<IUser, '_id'>>(defaultValue);
    const { register } = useAuthInfo();

    const { email, password, username } = useMemo(() => formState, [formState]);

    const inputFieldsMetaData = useMemo<InputHTMLAttributes<HTMLInputElement>[]>(() => [
        { placeholder: 'Email', type: 'email', name: 'email', value: email },
        { placeholder: 'Username', type: 'username', name: 'username', value: username },
        { placeholder: 'Password', type: 'password', name: 'password', value: password }
    ], [email, password, username]);

    const handleRegister = useCallback(async () => {
        await register(formState);
    }, [formState, register]);

    const renderInputField = useCallback(({ placeholder, type, value, name }: InputHTMLAttributes<HTMLInputElement>) =>
        <Input
            key={name}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />, [onChange]);

    const isButtonDisabled = useMemo(() => checkIfButtonDisabled(formState), [formState]);

    return (
        <FormBody>
            {inputFieldsMetaData.map(renderInputField)}
            <Button fullWidth onClick={handleRegister} disabled={isButtonDisabled}>Register</Button>
        </FormBody>);
});
