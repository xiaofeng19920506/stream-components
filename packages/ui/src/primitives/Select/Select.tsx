import React from "react";
import styles from "./Select.module.css";

export type SelectOption = { label: string; value: string };

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
  options: SelectOption[];
};

export function Select({
  label,
  helperText,
  options,
  id,
  className,
  ...rest
}: SelectProps) {
  const selectId = id || React.useId();
  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select id={selectId} className={styles.select} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && <div className={styles.helper}>{helperText}</div>}
    </div>
  );
}

