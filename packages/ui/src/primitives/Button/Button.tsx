import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'alert';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  link?: string;
  target?: '_self' | '_blank';
  padded?: boolean;
  borderOnHover?: boolean;
};

export function Button({
  variant = 'primary',
  className,
  children,
  onClick,
  link,
  target = '_self',
  disabled = false,
  type = 'button',
  padded = true,
  borderOnHover = false,
  ...rest
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (link) {
      window.open(link, target);
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        styles.button,
        !padded && styles.noPadding,
        styles[variant],
        disabled && styles.disabled,
        borderOnHover && styles.borderOnHover,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}



