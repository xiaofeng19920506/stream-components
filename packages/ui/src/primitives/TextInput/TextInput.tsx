import React from "react";
import clsx from "clsx";
import styles from "./TextInput.module.css";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  id?: string;
};

export function TextInput({
  label,
  helperText,
  error,
  id,
  className,
  ...rest
}: TextInputProps) {
  const inputId = id || React.useId();
  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(styles.input, error && styles.error, className)}
        {...rest}
      />
      {error ? (
        <div className={styles.errorText}>{error}</div>
      ) : helperText ? (
        <div className={styles.helper}>{helperText}</div>
      ) : null}
    </div>
  );
}
