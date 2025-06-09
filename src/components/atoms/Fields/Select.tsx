import React from "react";
import { FieldErrors, UseFormRegister, Path, PathValue } from "react-hook-form";
import { cn } from "@/lib/utils/cn";

interface SelectOption<T> {
  value: PathValue<T, Path<T>>;
  label: string;
}

interface SelectProps<T extends Record<string, unknown>> {
  name: Path<T>;
  options: SelectOption<T>[];
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  validation?: {
    required?: string | boolean;
    validate?: (value: PathValue<T, Path<T>>) => boolean | string;
  };
}

export const Select = <T extends Record<string, unknown>>({
  name,
  options,
  register,
  errors,
  required = false,
  className = "",
  label,
  placeholder = "Wybierz opcję",
  disabled = false,
  validation,
}: SelectProps<T>) => {
  const error = errors?.[name]?.message as string;

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
      )}
      <select
        className={cn(
          "select select-bordered w-full",
          error ? "select-error" : "",
          disabled ? "bg-gray-100 cursor-not-allowed" : "",
          className
        )}
        disabled={disabled}
        {...register(name, {
          required: required ? "To pole jest wymagane" : false,
          ...validation,
        })}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};
