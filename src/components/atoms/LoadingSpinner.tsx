interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "loading-sm",
    md: "",
    lg: "loading-lg",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <span
        className={`loading loading-spinner text-primary ${sizeClasses[size]}`}
      ></span>
    </div>
  );
}
