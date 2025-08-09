import React from "react";
import styles from "./SearchableSelect.module.css";

export type SearchableOption = { label: string; value: string };

export type SearchableSelectProps = {
  label?: string;
  options: SearchableOption[];
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
};

export function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
}: SearchableSelectProps) {
  const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [query, options]);

  return (
    <div className={styles.root}>
      {label && <div className={styles.label}>{label}</div>}
      <input
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.list}>
        {filtered.map((opt) => (
          <div
            key={opt.value}
            className={styles.item}
            onClick={() => onChange(opt.value)}
            role="button"
          >
            {opt.label}
          </div>
        ))}
        {filtered.length === 0 && <div className={styles.item}>No results</div>}
      </div>
    </div>
  );
}

