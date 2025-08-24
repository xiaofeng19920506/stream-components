import React from 'react';
import styles from './Modal.module.css';

export type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

export function Modal({ open, title, onClose, footer, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div>{title}</div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
