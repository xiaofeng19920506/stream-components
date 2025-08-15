import React, { useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(
    "SearchableSelect render - isOpen:",
    isOpen,
    "options:",
    options.length,
    "value:",
    value
  );

  // Ensure component starts with dropdown closed
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Find the selected option to display
  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : query;

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [query, options]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Handle escape key to close dropdown
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setIsOpen(true);

    // Clear selection if user is typing
    if (newValue !== selectedOption?.label) {
      onChange(null);
    }
  };

  // Handle option selection
  const handleOptionClick = (option: SearchableOption) => {
    console.log("SearchableSelect: Option clicked -", option.label);
    onChange(option.value);
    setQuery(option.label);
    setIsOpen(false);
  };

  // Handle focus
  const handleFocus = () => {
    console.log("SearchableSelect: Focus event - opening dropdown");
    setIsOpen(true);
    if (!selectedOption) {
      setQuery("");
    }
  };

  // Handle blur
  const handleBlur = () => {
    // Delay closing to allow option clicks
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className={styles.root} ref={containerRef}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isOpen && (
          <div className={styles.list}>
            {filtered.map((opt) => (
              <div
                key={opt.value}
                className={styles.item}
                onClick={() => handleOptionClick(opt)}
                role="button"
              >
                {opt.label}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className={styles.item}>No results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
