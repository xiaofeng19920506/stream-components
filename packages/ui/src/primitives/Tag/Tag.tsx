import React from "react";
import styles from "./Tag.module.css";

export type TagProps = {
  children: React.ReactNode;
  onRemove?: () => void;
};

export function Tag({ children, onRemove }: TagProps) {
  return (
    <span className={styles.tag}>
      {children}
      {onRemove && (
        <button
          className={styles.remove}
          onClick={onRemove}
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  );
}

