import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: string;
}

export function Badge({ children, color = "#CBD5E1" }: BadgeProps) {
  return (
    <span
      className="px-2 py-1 text-xs font-medium rounded-full"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {children}
    </span>
  );
}
