import { ButtonHTMLAttributes, FC, memo } from 'react';
import { resolveClassNames } from '../../utils';

interface ICustomButtonProps {
    fullWidth?: boolean;
    severity?: 'primary' | 'secondary' | 'danger';
    size?: 'base' | 'small';
}

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ICustomButtonProps> = memo(({ fullWidth, severity, size, children, className, ...rest }) => (
    <button
        className={resolveClassNames('button', rest.disabled ? 'button-disabled' : '', className || '')}
        {...rest}
    >
        {children}
    </button>
));
