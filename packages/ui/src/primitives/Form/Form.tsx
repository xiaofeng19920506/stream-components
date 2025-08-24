import React from 'react';
import styles from './Form.module.css';

export type FieldProps<T> = {
  name: keyof T & string;
  label?: string;
  validate?: (value: any, values: T) => string | undefined;
  children: (args: {
    value: any;
    onChange: (value: any) => void;
    error?: string;
  }) => React.ReactNode;
};

export type FormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
};

type FormContextType<T> = {
  values: T;
  setField: (name: keyof T & string, value: any) => void;
  registerField: (field: FieldProps<T>) => void;
  deregisterField: (name: keyof T & string) => void;
  errors: Record<string, string | undefined>;
};

const FormContext = React.createContext<FormContextType<any> | undefined>(undefined);

export function useFormContext<T>() {
  const ctx = React.useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used within <Form>');
  return ctx as FormContextType<T>;
}

export function Form<T>({ initialValues, onSubmit, children }: FormProps<T>) {
  const [values, setValues] = React.useState<T>(initialValues);
  const fields = React.useRef<Map<string, FieldProps<T>>>(new Map());
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});

  const setField = (name: keyof T & string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const registerField = (field: FieldProps<T>) => {
    fields.current.set(field.name, field);
  };

  const deregisterField = (name: keyof T & string) => {
    fields.current.delete(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string | undefined> = {};
    fields.current.forEach((f, name) => {
      if (f.validate) {
        newErrors[name] = f.validate((values as any)[name], values);
      }
    });
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (!hasError) onSubmit(values);
  };

  const ctx: FormContextType<T> = {
    values,
    setField,
    registerField,
    deregisterField,
    errors,
  };

  return (
    <FormContext.Provider value={ctx}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export function Field<T>({ name, label, validate, children }: FieldProps<T>) {
  const { values, setField, registerField, deregisterField, errors } = useFormContext<T>();
  React.useEffect(() => {
    registerField({ name, label, validate, children } as any);
    return () => deregisterField(name);
  }, [name, label, validate, children]);

  const value = (values as any)[name];
  const error = errors[name as string];

  return (
    <div className={styles.row}>
      {label && <label className={styles.label}>{label}</label>}
      {children({ value, onChange: (v) => setField(name, v), error })}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
