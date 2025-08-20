import React, { useRef, useEffect } from "react";
import styles from "./SearchableSelect.module.css";

// Generic type for object options
export type ObjectOption<T = any> = T & {
  label: string;
  value: string | number;
  actionIcon?: React.ReactNode;
  onActionClick?: (option: ObjectOption<T>) => void;
  // Enhanced action support
  actions?: Array<{
    icon?: React.ReactNode;
    text?: string;
    onClick: (option: ObjectOption<T>) => void;
    title?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }>;
};

// Legacy type for backward compatibility
export type SearchableOption = ObjectOption;

export type SearchableSelectProps<T = any> = {
  label?: string;
  options: ObjectOption<T>[];
  value?: string | number | null | (string | number)[]; // Support both single and multiple values
  onChange: (
    value: string | number | null | (string | number)[],
    option?: ObjectOption<T> | ObjectOption<T>[]
  ) => void;
  placeholder?: string;
  showActionIcons?: boolean;
  inputActionIcon?: React.ReactNode;
  onInputActionClick?: () => void;
  inputActionClassName?: string;
  inputActionStyle?: React.CSSProperties;
  // New props for empty state action button
  emptyActionIcon?: React.ReactNode;
  onEmptyActionClick?: () => void;
  showEmptyAction?: boolean;
  emptyActionClassName?: string;
  emptyActionStyle?: React.CSSProperties;
  // Enhanced action button props
  showActionOnFocus?: boolean;
  actionButtonText?: string;
  actionButtonVariant?: "icon" | "text" | "button";
  actionButtonSize?: "small" | "medium" | "large";
  // Enhanced action support
  showOptionActions?: boolean;
  defaultActions?: Array<{
    icon?: React.ReactNode;
    text?: string;
    onClick: (option: ObjectOption<T>) => void;
    title?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }>;
  // Object option support
  getOptionLabel?: (option: ObjectOption<T>) => string;
  getOptionValue?: (option: ObjectOption<T>) => string | number;
  searchableFields?: (keyof T)[];
  displayField?: keyof T | "label";
  valueField?: keyof T | "value";
  // Multiselect support
  multiselect?: boolean;
  maxSelections?: number;
  showSelectedCount?: boolean;
  selectedItemStyle?: React.CSSProperties;
  removeIcon?: React.ReactNode;
};

export function SearchableSelect<T = any>({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Search...",
  showActionIcons = false,
  inputActionIcon,
  onInputActionClick,
  inputActionClassName,
  inputActionStyle,
  emptyActionIcon,
  onEmptyActionClick,
  showEmptyAction = false,
  emptyActionClassName,
  emptyActionStyle,
  showActionOnFocus = false,
  actionButtonText,
  actionButtonVariant = "icon",
  actionButtonSize = "medium",
  showOptionActions = false,
  defaultActions = [],
  getOptionLabel,
  getOptionValue,
  searchableFields,
  displayField = "label",
  valueField = "value",
  multiselect,
  maxSelections,
  showSelectedCount,
  selectedItemStyle,
  removeIcon,
}: SearchableSelectProps<T>) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure component starts with dropdown closed
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Helper function to get option label
  const getLabel = (option: ObjectOption<T>): string => {
    if (getOptionLabel) {
      return getOptionLabel(option);
    }

    if (displayField === "label") {
      return option.label || "";
    }

    const fieldValue = option[displayField];
    return fieldValue ? String(fieldValue) : "";
  };

  // Helper function to get option value
  const getValue = (option: ObjectOption<T>): string | number => {
    if (getOptionValue) {
      return getOptionValue(option);
    }

    if (valueField === "value") {
      return option.value;
    }

    const fieldValue = option[valueField];
    return fieldValue !== undefined && fieldValue !== null
      ? String(fieldValue)
      : option.value;
  };

  // Handle multiselect vs single select
  const isMultiselect = multiselect === true;
  const selectedValues = isMultiselect
    ? Array.isArray(value)
      ? value
      : []
    : value
    ? [value]
    : [];

  // Find the selected options to display
  const selectedOptions = options?.filter(
    (option) => option && selectedValues.includes(getValue(option))
  );

  // For multiselect, show selected items as tags and query
  // For single select, use query when user is typing, otherwise show selected option label
  const displayValue = isMultiselect
    ? query
    : query || (selectedOptions[0] ? getLabel(selectedOptions[0]) : "");

  // Check if input is empty (no value selected and no query)
  const isInputEmpty = !displayValue && !query && selectedValues.length === 0;

  // Determine if action button should be shown
  const shouldShowActionButton =
    (showEmptyAction && emptyActionIcon) || (showActionOnFocus && isOpen);

  // Helper function to get action button styles
  const getActionButtonStyles = () => {
    const baseStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      padding: "0",
      margin: "0",
      fontSize: "14px",
      fontFamily: "inherit",
    };

    switch (actionButtonVariant) {
      case "text":
        return {
          ...baseStyles,
          color: "#007bff",
          fontWeight: "500",
          padding: "4px 8px",
          borderRadius: "4px",
          transition: "background-color 0.2s",
        };
      case "button":
        return {
          ...baseStyles,
          backgroundColor: "#007bff",
          color: "white",
          padding:
            actionButtonSize === "small"
              ? "4px 8px"
              : actionButtonSize === "large"
              ? "8px 16px"
              : "6px 12px",
          borderRadius: "4px",
          fontSize:
            actionButtonSize === "small"
              ? "12px"
              : actionButtonSize === "large"
              ? "16px"
              : "14px",
          fontWeight: "500",
          transition: "background-color 0.2s",
        };
      case "icon":
      default:
        return {
          ...baseStyles,
          color: "#007bff",
          fontSize:
            actionButtonSize === "small"
              ? "16px"
              : actionButtonSize === "large"
              ? "24px"
              : "20px",
          padding: "4px",
        };
    }
  };

  // Helper function to check if a field value matches the search query
  const fieldMatchesQuery = (
    option: ObjectOption<T>,
    field: keyof T,
    query: string
  ): boolean => {
    const fieldValue = option[field];
    if (fieldValue === undefined || fieldValue === null) return false;
    return String(fieldValue).toLowerCase().includes(query.toLowerCase());
  };

  const filtered = React.useMemo(() => {
    try {
      const q = query.toLowerCase();
      return options.filter((o) => {
        try {
          // Ensure o exists
          if (!o) return false;

          // In multiselect mode, exclude already selected options
          if (isMultiselect && selectedValues.includes(getValue(o))) {
            return false;
          }

          // If searchableFields is specified, search only those fields
          if (searchableFields && searchableFields.length > 0) {
            return searchableFields.some((field) =>
              fieldMatchesQuery(o, field, q)
            );
          }

          // Default search behavior - search in label and value
          const label = getLabel(o);
          const optionValue = getValue(o);

          return (
            label.toLowerCase().includes(q) ||
            String(optionValue).toLowerCase().includes(q)
          );
        } catch (error) {
          console.warn("Error filtering option:", o, error);
          return false;
        }
      });
    } catch (error) {
      console.error("Error in SearchableSelect filter:", error);
      return [];
    }
  }, [
    query,
    options,
    searchableFields,
    getOptionLabel,
    getOptionValue,
    displayField,
    valueField,
    isMultiselect,
    selectedValues,
  ]);

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

    // For single select, clear selection if user is typing and the value doesn't match the selected option
    if (
      !isMultiselect &&
      selectedOptions[0] &&
      newValue !== getLabel(selectedOptions[0])
    ) {
      onChange(null);
    }
  };

  // Handle option selection
  const handleOptionClick = (option: ObjectOption<T>) => {
    if (option) {
      const optionValue = getValue(option);

      if (isMultiselect) {
        // For multiselect, add to existing selections
        const newSelectedValues = [...selectedValues, optionValue];

        // Check max selections limit
        if (maxSelections && newSelectedValues.length > maxSelections) {
          return; // Don't add if max reached
        }

        const newSelectedOptions = [...selectedOptions, option];
        onChange(newSelectedValues, newSelectedOptions);
        setQuery(""); // Clear query when option is selected
        // Keep dropdown open for multiselect
      } else {
        // For single select, replace selection
        onChange(optionValue, option);
        setQuery(""); // Clear query when option is selected
        setIsOpen(false);
      }
    }
  };

  // Handle removing a selected item in multiselect mode
  const handleRemoveSelected = (valueToRemove: string | number) => {
    if (isMultiselect) {
      const newSelectedValues = selectedValues.filter(
        (v) => v !== valueToRemove
      );
      const newSelectedOptions = selectedOptions.filter(
        (opt) => getValue(opt) !== valueToRemove
      );
      onChange(newSelectedValues, newSelectedOptions);
    }
  };

  // Handle legacy action icon click
  const handleActionClick = (e: React.MouseEvent, option: ObjectOption<T>) => {
    e.stopPropagation(); // Prevent option selection
    if (option.onActionClick) {
      option.onActionClick(option);
    }
  };

  // Handle enhanced action click
  const handleEnhancedActionClick = (
    e: React.MouseEvent,
    option: ObjectOption<T>,
    action: { onClick: (option: ObjectOption<T>) => void; disabled?: boolean }
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
    if (!selectedOptions[0]) {
      setQuery("");
    }
  };

  // Handle blur
  const handleBlur = () => {
    // Delay closing to allow option clicks
    setTimeout(() => setIsOpen(false), 150);
  };

  // Get actions for an option (combine option-specific and default actions)
  const getOptionActions = (option: ObjectOption<T>) => {
    const optionActions = option.actions || [];
    const allActions = [...optionActions, ...defaultActions];
    return allActions.filter(
      (action) => action && (action.icon || action.text)
    );
  };

  return (
    <div className={styles.root} ref={containerRef}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.inputWrapper}>
        {isMultiselect && selectedOptions.length > 0 && (
          <div className={styles.selectedItemsContainer}>
            {selectedOptions.map((option) => (
              <span
                key={getValue(option)}
                className={styles.selectedItem}
                style={selectedItemStyle}
              >
                {getLabel(option)}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSelected(getValue(option));
                  }}
                  title="Remove"
                >
                  {removeIcon || "×"}
                </button>
              </span>
            ))}
            {showSelectedCount && (
              <span className={styles.selectedCount}>
                {selectedOptions.length} selected
              </span>
            )}
          </div>
        )}
        <input
          className={styles.input}
          placeholder={
            isMultiselect && selectedOptions.length > 0 ? "" : placeholder
          }
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* Show action button when conditions are met */}
        {shouldShowActionButton && (
          <button
            className={styles.actionButton}
            style={getActionButtonStyles()}
            onClick={handleEmptyActionClick}
            type="button"
          >
            {emptyActionIcon || actionButtonText || "+"}
          </button>
        )}
        {isOpen && (
          <div className={styles.list}>
            {filtered.map((opt) => {
              const actions = getOptionActions(opt);
              const hasLegacyAction = showActionIcons && opt.actionIcon;
              const hasEnhancedActions =
                showOptionActions && actions.length > 0;

              return (
                <div
                  key={getValue(opt)}
                  className={styles.item}
                  onClick={() => handleOptionClick(opt)}
                  role="button"
                >
                  <span className={styles.itemLabel}>{getLabel(opt)}</span>
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
                    {hasEnhancedActions &&
                      actions.map((action, index) => (
                        <div
                          key={index}
                          className={`${styles.actionIcon} ${
                            action.disabled ? styles.actionIconDisabled : ""
                          } ${action.className || ""}`}
                          style={action.style}
                          onClick={(e) =>
                            handleEnhancedActionClick(e, opt, action)
                          }
                          title={action.title}
                        >
                          {action.icon || action.text}
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
