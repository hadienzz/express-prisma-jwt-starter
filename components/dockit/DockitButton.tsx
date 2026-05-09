import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DockitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "success" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

const variantClasses = {
  primary:
    "border-dockit-blue bg-dockit-blue text-white hover:bg-[#256FD0] active:bg-[#1E62BA]",
  success:
    "border-dockit-green bg-dockit-green text-white hover:bg-[#0C665A] active:bg-[#0A5A50]",
  outline:
    "border-dockit-border-emphasis bg-white text-dockit-heading hover:bg-dockit-hover active:bg-dockit-secondary",
  ghost:
    "border-transparent bg-transparent text-dockit-muted hover:bg-dockit-hover hover:text-dockit-heading active:bg-dockit-secondary",
  danger:
    "border-dockit-danger bg-dockit-danger text-white hover:bg-[#C93636] active:bg-[#B12E2E]",
};

const sizeClasses = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-[15px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md border-[0.5px] font-medium transition-colors duration-150 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dockit-blue disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const DockitButton = ({
  children,
  className,
  disabled,
  href,
  variant = "primary",
  size = "md",
  ...props
}: DockitButtonProps) => {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default DockitButton;
