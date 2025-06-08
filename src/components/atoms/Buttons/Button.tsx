import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent" | "ghost" | "link";
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}
export const Button = ({
  type = "button",
  variant = "primary",
  loading,
  children,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} w-full ${
        loading ? "loading" : ""
      } ${className}`}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};
