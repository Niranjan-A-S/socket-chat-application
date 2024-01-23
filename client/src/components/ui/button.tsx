import { ButtonHTMLAttributes, FC, memo } from 'react';

interface ICustomButtonProps {
    fullWidth?: boolean;
    severity?: 'primary' | 'secondary' | 'danger';
    size?: 'base' | 'small';
}

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ICustomButtonProps> = memo(({ fullWidth, severity, size, children, className, ...rest }) => (
    <button
        {...rest}
    >
        {children}
    </button>
));
