import { Button } from "@/components/atoms/Buttons/Button";
import { Input } from "@/components/atoms/Fields/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useState } from "react";
import { RegisterFormProps } from "@/lib/types/form";
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

      <Input<RegisterFormData>
        name="email"
        type="email"
        label="Email"
        placeholder="Wprowadź swój email"
        register={register}
        errors={errors}
        required
      />

      <Input<RegisterFormData>
        name="firstName"
        type="text"
        label="Imię"
        placeholder="Wprowadź swoje imię"
        register={register}
        errors={errors}
        required
      />

      <Input<RegisterFormData>
        name="lastName"
        type="text"
        label="Nazwisko"
        placeholder="Wprowadź swoje nazwisko"
        register={register}
        errors={errors}
        required
      />

      <Input<RegisterFormData>
        name="password"
        type="password"
        label="Hasło"
        placeholder="Wprowadź hasło"
        register={register}
        errors={errors}
        required
      />

      <Input<RegisterFormData>
        name="confirmPassword"
        type="password"
        label="Potwierdź hasło"
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
