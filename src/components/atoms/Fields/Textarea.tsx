import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils/cn";

interface TextareaProps<T extends Record<string, unknown>> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
}

export const Textarea = <T extends Record<string, unknown>>({
  name,
  register,
  errors,
  required = false,
  className = "",
  label = "Opis",
  placeholder = "Wprowadź tekst...",
  rows = 4,
  maxLength,
  minLength,
}: TextareaProps<T>) => {
  const error = errors?.[name]?.message as string;

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      <textarea
        className={cn(
          "textarea textarea-bordered w-full",
          error ? "textarea-error" : "",
          className
        )}
        placeholder={placeholder}
        rows={rows}
        {...register(name, {
          required: required ? "To pole jest wymagane" : false,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `Maksymalna długość to ${maxLength} znaków`,
              }
            : undefined,
          minLength: minLength
            ? {
                value: minLength,
                message: `Minimalna długość to ${minLength} znaków`,
              }
            : undefined,
        })}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};
