import React from 'react';
import styles from './MultiSelect.module.css';

export type MultiSelectOption = { label: string; value: string };

export type MultiSelectProps = {
  label?: string;
  helperText?: string;
  options: MultiSelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
};

export function MultiSelect({ label, helperText, options, values, onChange }: MultiSelectProps) {
  const toggleValue = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };
  return (
    <div className={styles.root}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.box}>
        {options.map((opt) => (
          <label key={opt.value} className={styles.option}>
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => toggleValue(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {helperText && <div className={styles.helper}>{helperText}</div>}
    </div>
  );
}
