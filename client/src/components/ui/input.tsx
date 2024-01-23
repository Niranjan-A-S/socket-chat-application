import { FC, InputHTMLAttributes, memo } from 'react';
import { resolveClassNames } from '../../utils';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = memo(({ className, ...rest }) => (
    <input
        {...rest}
        className={resolveClassNames(className || '')}
    />));
