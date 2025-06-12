import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputProps<T extends Record<string, unknown>> {
  name: Path<T>;
  type?: "text" | "number" | "email" | "password" | "date"; // możesz rozszerzyć typy
  placeholder?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  className?: string;
  label?: string;
  step?: string;
  min?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: RegisterOptions<T, Path<T>>;
}

export const Input = <T extends Record<string, unknown>>({
  name,
  type = "text",
  placeholder,
  register,
  errors,
  required = false,
  className = "",
  label,
  validation = {},
  step,
  min,
  onChange,
}: InputProps<T>) => {
  const error = errors?.[name]?.message as string | undefined;

  const registerOptions = {
    ...(required ? { required: "To pole jest wymagane" } : {}),
    ...(type === "number" ? { valueAsNumber: true } : {}),
    ...validation,
  } as RegisterOptions<T, Path<T>>;

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${
          error ? "input-error" : ""
        } ${className}`}
        step={step}
        min={min}
        {...register(name, registerOptions)}
        onChange={onChange}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};
