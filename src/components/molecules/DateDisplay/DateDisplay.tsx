import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

interface DateDisplayProps {
  date: string | Date;
  size?: "sm" | "lg";
}

export const DateDisplay = ({ date, size = "lg" }: DateDisplayProps) => {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <FaCalendarAlt
        className={`h-${size === "lg" ? "5" : "4"} w-${
          size === "lg" ? "5" : "4"
        }`}
      />
      <span className={`text-${size === "lg" ? "lg" : "sm"}`}>
        {format(new Date(date), "d MMMM yyyy", {
          locale: pl,
        })}
      </span>
    </div>
  );
};
