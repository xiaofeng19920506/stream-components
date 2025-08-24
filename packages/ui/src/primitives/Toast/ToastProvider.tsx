import React from 'react';
import styles from './Toast.module.css';

export type ToastKind = 'default' | 'success' | 'warning' | 'error';
export type Toast = { id: string; title?: string; message?: string; kind?: ToastKind };

type ToastContextValue = {
  toasts: Toast[];
  notify: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const notify = React.useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3000);
  }, []);
  const remove = React.useCallback(
    (id: string) => setToasts((prev) => prev.filter((x) => x.id !== id)),
    [],
  );

  return (
    <ToastContext.Provider value={{ toasts, notify, remove }}>
      {children}
      <div className={styles.container} aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${t.kind ? styles[t.kind] : ''}`}>
            {t.title && <div className={styles.title}>{t.title}</div>}
            {t.message && <div className={styles.msg}>{t.message}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
