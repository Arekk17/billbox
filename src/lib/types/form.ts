import { LoginFormData, RegisterFormData } from "@/lib/validations/auth";
import { FieldValues } from "react-hook-form";

export interface BaseFormProps<T extends FieldValues> {
  onSubmit: (data: T) => Promise<void>;
  loading?: boolean;
  className?: string;
  defaultValues?: Partial<T>;
}

export interface LoginFormProps extends BaseFormProps<LoginFormData> {
  onForgotPassword?: () => void;
}

export interface RegisterFormProps extends BaseFormProps<RegisterFormData> {
  onLoginClick?: () => void;
}
