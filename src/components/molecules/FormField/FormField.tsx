import { cn } from "@/lib/utils/cn";
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type FieldValue = string | number | boolean | null;

type ValidationRules = {
  required?: string | boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: FieldValue) => boolean | string;
};

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  validation?: ValidationRules;
  disabled?: boolean;
  className?: string;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  required,
  validation,
  disabled,
  className,
}: FormFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="space-y-1">
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500",
          disabled && "bg-gray-100 cursor-not-allowed",
          className
        )}
        {...register(name, validation)}
      />

      {errorMessage && (
        <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
