import React from "react";
import clsx from "clsx";
import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "focus";

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
};

export function Tooltip({
  content,
  children,
  placement = "top",
  trigger = "hover",
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const wrapperProps: React.HTMLAttributes<HTMLSpanElement> = {};

  if (trigger === "hover") {
    // CSS handles hover by default; no state wiring needed
  } else if (trigger === "click") {
    wrapperProps.onClick = () => setOpen((v) => !v);
  } else if (trigger === "focus") {
    wrapperProps.onFocus = () => setOpen(true);
    wrapperProps.onBlur = () => setOpen(false);
    wrapperProps.tabIndex = 0;
  }

  return (
    <span className={styles.wrapper} {...wrapperProps}>
      {children}
      <span
        className={clsx(
          styles.bubble,
          styles[placement],
          trigger !== "hover" && open && styles.visible
        )}
      >
        {content}
      </span>
    </span>
  );
}
