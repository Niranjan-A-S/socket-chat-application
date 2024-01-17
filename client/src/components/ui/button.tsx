import { ButtonHTMLAttributes, FC, memo } from 'react';
import { resolveClassNames } from '../../utils';

interface ICustomButtonProps {
    fullWidth?: boolean;
    severity?: 'primary' | 'secondary' | 'danger';
    size?: 'base' | 'small';
}

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ICustomButtonProps> = memo(({ fullWidth, severity, size, children, className, ...rest }) => (
    <button
        {...rest}
        className={resolveClassNames(
            'rounded-full inline-flex flex-shrink-0 justify-center items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-sm cursor-pointer',
            fullWidth ? 'w-full' : '',
            severity === 'secondary'
                ? 'bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 outline outline-[1px] outline-zinc-400'
                : severity === 'danger'
                    ? 'bg-danger hover:bg-danger/80 disabled:bg-danger/50'
                    : 'bg-primary hover:bg-primary/80 disabled:bg-primary/50',
            size === 'small' ? 'text-sm px-3 py-1.5' : 'text-base px-4 py-3',
            className || ''
        )}
    >
        {children}
    </button>
));
