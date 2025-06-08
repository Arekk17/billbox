import { Button } from "@/components/atoms/Buttons/Button";
import { FormField } from "@/components/molecules/FormField/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useState } from "react";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  loading?: boolean;
}

export const RegisterForm = ({ onSubmit, loading }: RegisterFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      await onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Wystąpił nieoczekiwany błąd");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
          {serverError}
        </div>
      )}

      <FormField<RegisterFormData>
        name="email"
        label="Email"
        type="email"
        placeholder="Wprowadź swój email"
        register={register}
        errors={errors}
        required
      />

      <FormField<RegisterFormData>
        name="firstName"
        label="Imię"
        type="text"
        placeholder="Wprowadź swoje imię"
        register={register}
        errors={errors}
        required
      />

      <FormField<RegisterFormData>
        name="lastName"
        label="Nazwisko"
        type="text"
        placeholder="Wprowadź swoje nazwisko"
        register={register}
        errors={errors}
        required
      />

      <FormField<RegisterFormData>
        name="password"
        label="Hasło"
        type="password"
        placeholder="Wprowadź hasło"
        register={register}
        errors={errors}
        required
      />

      <FormField<RegisterFormData>
        name="confirmPassword"
        label="Potwierdź hasło"
        type="password"
        placeholder="Potwierdź hasło"
        register={register}
        errors={errors}
        required
      />

      <Button type="submit" className="w-full" loading={loading}>
        Zarejestruj się
      </Button>
    </form>
  );
};
