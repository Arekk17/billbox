import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-base-100 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
}
