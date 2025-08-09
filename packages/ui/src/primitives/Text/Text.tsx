import React from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';

export type TextVariant = 'body' | 'muted' | 'title' | 'small';

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
  variant?: TextVariant;
  children?: React.ReactNode;
};

export function Text({ as: Tag = 'p', variant = 'body', className, children, ...rest }: TextProps) {
  return (
    <Tag className={clsx(styles.text, variant !== 'body' && styles[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}



