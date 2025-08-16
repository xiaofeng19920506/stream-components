import React, { useRef, useEffect } from "react";
import styles from "./SearchableSelect.module.css";

export type SearchableOption = {
  label: string;
  value: string;
  actionIcon?: React.ReactNode;
  onActionClick?: (option: SearchableOption) => void;
};

export type SearchableSelectProps = {
  label?: string;
  options: SearchableOption[];
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  showActionIcons?: boolean;
  inputActionIcon?: React.ReactNode;
  onInputActionClick?: () => void;
};

export function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Search...",
  showActionIcons = false,
  inputActionIcon,
  onInputActionClick,
}: SearchableSelectProps) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure component starts with dropdown closed
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Find the selected option to display
  const selectedOption = options.find(
    (option) => option && option.value === value
  );
  const displayValue =
    selectedOption && selectedOption.label && typeof selectedOption.label === "string" 
      ? selectedOption.label 
      : query;

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => {
      // Ensure o exists, has a label property, and label is a string
      if (!o || !o.label || typeof o.label !== "string") {
        return false;
      }
      return o.label.toLowerCase().includes(q);
    });
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
    if (option && option.value) {
      onChange(option.value);
      setQuery(option.label || "");
      setIsOpen(false);
    }
  };

  // Handle action icon click
  const handleActionClick = (e: React.MouseEvent, option: SearchableOption) => {
    e.stopPropagation(); // Prevent option selection
    if (option.onActionClick) {
      option.onActionClick(option);
    }
  };

  // Handle input action icon click
  const handleInputActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent input focus
    if (onInputActionClick) {
      onInputActionClick();
    }
  };

  // Handle focus
  const handleFocus = () => {
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
        {/* Show + symbol when input is empty */}
        {!displayValue && !isOpen && !inputActionIcon && (
          <div className={styles.addIcon}>+</div>
        )}
        {/* Show custom input action icon */}
        {inputActionIcon && (
          <div
            className={styles.inputActionIcon}
            onClick={handleInputActionClick}
          >
            {inputActionIcon}
          </div>
        )}
        {isOpen && (
          <div className={styles.list}>
            {filtered.map((opt) => (
              <div
                key={opt.value}
                className={styles.item}
                onClick={() => handleOptionClick(opt)}
                role="button"
              >
                <span className={styles.itemLabel}>{opt.label}</span>
                {showActionIcons && opt.actionIcon && (
                  <div
                    className={styles.actionIcon}
                    onClick={(e) => handleActionClick(e, opt)}
                  >
                    {opt.actionIcon}
                  </div>
                )}
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
