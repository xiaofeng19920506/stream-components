import React from 'react';
import styles from './ToggleSwitch.module.css';

export type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
};

export function ToggleSwitch({ checked, onChange, label, id }: ToggleSwitchProps) {
  const inputId = id || React.useId();
  return (
    <label className={styles.root} htmlFor={inputId}>
      <span className={`${styles.track} ${checked ? styles.checked : ''}`}>
        <span className={`${styles.thumb} ${checked ? styles.checkedThumb : ''}`} />
      </span>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: 'none' }}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
