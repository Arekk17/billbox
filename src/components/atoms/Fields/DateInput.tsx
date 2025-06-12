import { cn } from "@/lib/utils/cn";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

interface DateInputProps<T extends Record<string, unknown>> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  className?: string;
  label?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
}

export const DateInput = <T extends Record<string, unknown>>({
  name,
  register,
  errors,
  required = false,
  className = "",
  label = "Data",
  defaultValue = new Date().toISOString().split("T")[0],
  min,
  max,
}: DateInputProps<T>) => {
  const error = errors?.[name]?.message as string;
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      <input
        type="date"
        className={cn(
          "input input-bordered w-full",
          error ? "input-error" : "",
          className
        )}
        {...register(name, {
          required: required ? "To pole jest wymagane" : false,
        })}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};
