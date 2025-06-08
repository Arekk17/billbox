import React from "react";
import { FieldErrors, UseFormRegister, Path } from "react-hook-form";

interface InputProps<T extends Record<string, unknown>> {
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  className?: string;
  label?: string;
  validation?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
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
  validation,
}: InputProps<T>) => {
  const error = errors?.[name]?.message as string;
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${
          error ? "input-error" : ""
        } ${className}`}
        {...register(name, {
          required: required ? "to pole jest wymagane" : false,
          ...validation,
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
