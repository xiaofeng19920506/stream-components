import React from "react";
import styles from "./Spinner.module.css";

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export function Spinner({ size = 20, style, ...rest }: SpinnerProps) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
}

