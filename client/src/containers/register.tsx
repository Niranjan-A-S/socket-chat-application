import { FC, InputHTMLAttributes, memo, useCallback, useMemo } from 'react';
import { FormBody } from '../components/form-body';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useFormState } from '../hooks/use-form-state';
import { IUser } from '../types';

const defaultValue: IUser = {
    email: '',
    password: '',
    username: ''
};

export const RegisterContainer: FC = memo(() => {

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

    return (
        <FormBody>
            {inputFieldsMetaData.map(renderInputField)}
            <Button fullWidth>Register</Button>
        </FormBody>);
});
