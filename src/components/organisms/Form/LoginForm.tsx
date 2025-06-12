import { Button } from "@/components/atoms/Buttons/Button";
import { Input } from "@/components/atoms/Fields/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { LoginFormProps } from "@/lib/types/form";

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input<LoginFormData>
        name="email"
        type="email"
        label="Email"
        placeholder="Wprowadź swój email"
        register={register}
        errors={errors}
        required
        validation={{
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Nieprawidłowy adres email",
          },
        }}
      />
      <Input<LoginFormData>
        name="password"
        type="password"
        label="Hasło"
        placeholder="Wprowadź swoje hasło"
        register={register}
        errors={errors}
        required
        validation={{
          minLength: {
            value: 6,
            message: "Hasło musi mieć minimum 6 znaków",
          },
        }}
      />
      <Button type="submit" className="w-full" loading={loading}>
        Zaloguj się
      </Button>
    </form>
  );
};
