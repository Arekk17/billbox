import { FaTag } from "react-icons/fa";

interface CategoryBadgeProps {
  name: string;
  color: string;
  size?: "sm" | "lg";
}

export const CategoryBadge = ({
  name,
  color,
  size = "lg",
}: CategoryBadgeProps) => {
  return (
    <div
      className={`badge badge-${size} p-4 text-${size === "lg" ? "lg" : "sm"}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      <FaTag className="mr-2" />
      {name}
    </div>
  );
};
