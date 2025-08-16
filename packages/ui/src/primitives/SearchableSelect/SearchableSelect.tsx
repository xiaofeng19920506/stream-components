import React, { useRef, useEffect } from "react";
import styles from "./SearchableSelect.module.css";

export type SearchableOption = {
  label: string;
  value: string;
  actionIcon?: React.ReactNode;
  onActionClick?: (option: SearchableOption) => void;
  // Enhanced action support
  actions?: Array<{
    icon: React.ReactNode;
    onClick: (option: SearchableOption) => void;
    title?: string;
    disabled?: boolean;
  }>;
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
  // New props for empty state action button
  emptyActionIcon?: React.ReactNode;
  onEmptyActionClick?: () => void;
  showEmptyAction?: boolean;
  // Enhanced action support
  showOptionActions?: boolean;
  defaultActions?: Array<{
    icon: React.ReactNode;
    onClick: (option: SearchableOption) => void;
    title?: string;
    disabled?: boolean;
  }>;
};

export function SearchableSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Search...",
  showActionIcons = false,
  inputActionIcon,
  onInputActionClick,
  emptyActionIcon,
  onEmptyActionClick,
  showEmptyAction = false,
  showOptionActions = false,
  defaultActions = [],
}: SearchableSelectProps) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure component starts with dropdown closed
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Find the selected option to display
  const selectedOption = options?.find(
    (option) => option && option.value === value
  );
  const displayValue =
    selectedOption &&
    selectedOption.label &&
    typeof selectedOption.label === "string"
      ? selectedOption.label
      : query;

  // Check if input is empty (no value selected and no query)
  const isInputEmpty = !displayValue && !query;

  const filtered = React.useMemo(() => {
    try {
      const q = query.toLowerCase();
      return options.filter((o) => {
        try {
          // Ensure o exists, has a label property, and label is a string
          if (!o || !o.label || typeof o.label !== "string") {
            return false;
          }
          return o.label.toLowerCase().includes(q);
        } catch (error) {
          console.warn('Error filtering option:', o, error);
          return false;
        }
      });
    } catch (error) {
      console.error('Error in SearchableSelect filter:', error);
      return [];
    }
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

  // Handle legacy action icon click
  const handleActionClick = (e: React.MouseEvent, option: SearchableOption) => {
    e.stopPropagation(); // Prevent option selection
    if (option.onActionClick) {
      option.onActionClick(option);
    }
  };

  // Handle enhanced action click
  const handleEnhancedActionClick = (
    e: React.MouseEvent,
    option: SearchableOption,
    action: { onClick: (option: SearchableOption) => void; disabled?: boolean }
  ) => {
    e.stopPropagation(); // Prevent option selection
    if (!action.disabled && action.onClick) {
      action.onClick(option);
    }
  };

  // Handle input action icon click
  const handleInputActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent input focus
    if (onInputActionClick) {
      onInputActionClick();
    }
  };

  // Handle empty action icon click
  const handleEmptyActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent input focus
    if (onEmptyActionClick) {
      onEmptyActionClick();
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

  // Get actions for an option (combine option-specific and default actions)
  const getOptionActions = (option: SearchableOption) => {
    const optionActions = option.actions || [];
    const allActions = [...optionActions, ...defaultActions];
    return allActions.filter(action => action && action.icon);
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
        {/* Show empty action icon when input is empty and not open */}
        {isInputEmpty && !isOpen && showEmptyAction && emptyActionIcon && (
          <div
            className={styles.emptyActionIcon}
            onClick={handleEmptyActionClick}
          >
            {emptyActionIcon}
          </div>
        )}
        {/* Show default + symbol when input is empty and no custom empty action */}
        {isInputEmpty && !isOpen && !showEmptyAction && !inputActionIcon && (
          <div className={styles.addIcon}>+</div>
        )}
        {/* Show custom input action icon when there's a value or query */}
        {(!isInputEmpty || isOpen) && inputActionIcon && (
          <div
            className={styles.inputActionIcon}
            onClick={handleInputActionClick}
          >
            {inputActionIcon}
          </div>
        )}
        {isOpen && (
          <div className={styles.list}>
            {filtered.map((opt) => {
              const actions = getOptionActions(opt);
              const hasLegacyAction = showActionIcons && opt.actionIcon;
              const hasEnhancedActions = showOptionActions && actions.length > 0;
              
              return (
                <div
                  key={opt.value}
                  className={styles.item}
                  onClick={() => handleOptionClick(opt)}
                  role="button"
                >
                  <span className={styles.itemLabel}>{opt.label}</span>
                  <div className={styles.actionContainer}>
                    {/* Legacy action icon support */}
                    {hasLegacyAction && (
                      <div
                        className={styles.actionIcon}
                        onClick={(e) => handleActionClick(e, opt)}
                        title="Action"
                      >
                        {opt.actionIcon}
                      </div>
                    )}
                    {/* Enhanced actions support */}
                    {hasEnhancedActions && actions.map((action, index) => (
                      <div
                        key={index}
                        className={`${styles.actionIcon} ${
                          action.disabled ? styles.actionIconDisabled : ''
                        }`}
                        onClick={(e) => handleEnhancedActionClick(e, opt, action)}
                        title={action.title}
                      >
                        {action.icon}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className={styles.item}>No results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
