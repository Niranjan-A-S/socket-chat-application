import { FC, InputHTMLAttributes, memo } from 'react';
import { resolveClassNames } from '../../utils';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = memo(({ className, ...rest }) => (
    <input
        {...rest}
        className={resolveClassNames(
            'block w-full rounded-xl outline outline-[1px] outline-zinc-400 border-0 py-4 px-5 bg-secondary font-light ',
            className || ''
        )}
    />));
