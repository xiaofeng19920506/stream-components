import React from "react";
import styles from "./Card.module.css";

export function Card({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${styles.card} ${className || ""}`.trim()}>{children}</div>
  );
}

export function CardHeader({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${styles.header} ${className || ""}`.trim()}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${styles.body} ${className || ""}`.trim()}>{children}</div>
  );
}

export function CardFooter({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${styles.footer} ${className || ""}`.trim()}>
      {children}
    </div>
  );
}

