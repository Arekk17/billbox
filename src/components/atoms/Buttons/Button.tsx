import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent" | "ghost" | "link";
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const getSpinnerColor = (variant: string) => {
  switch (variant) {
    case "primary":
      return "text-primary-content";
    case "secondary":
      return "text-secondary-content";
    case "accent":
      return "text-accent-content";
    case "ghost":
      return "text-base-content";
    case "link":
      return "text-primary";
    default:
      return "text-primary-content";
  }
};

export const Button = ({
  type = "button",
  variant = "primary",
  loading,
  children,
  className,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const spinnerColor = getSpinnerColor(variant);

  return (
    <button
      type={type}
      className={`btn btn-${variant} relative transition-all duration-200 ${
        loading ? "cursor-wait" : ""
      } ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      <div
        className={`transition-opacity duration-200 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 animate-fade-in">
          <div
            className={`loading loading-spinner loading-sm ${spinnerColor}`}
          ></div>
          <span className={`opacity-50 ${spinnerColor}`}>Ładowanie...</span>
        </div>
      )}
    </button>
  );
};
