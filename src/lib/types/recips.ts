import { FieldErrors, Path } from "react-hook-form";

import { UseFormRegister } from "react-hook-form";
import { Category } from "../validations/category";
import { ReceiptFormData } from "../validations/recipt";

export type FileInputValue = FileList | null;

export interface FileInputProps<T extends Record<string, unknown>> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  className?: string;
  label?: string;
  maxSize?: number;
  validation?: {
    required?: string | boolean;
    validate?: (value: FileInputValue) => boolean | string;
  };
}
export interface ReceiptFormProps {
  onSubmit: (data: ReceiptFormData) => Promise<void>;
  loading?: boolean;
  defaultValues?: Partial<ReceiptFormData>;
  categories: Category[];
}
