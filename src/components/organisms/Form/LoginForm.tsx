import { Button } from "@/components/atoms/Buttons/Button";
import { FormField } from "@/components/molecules/FormField/FormField";
import { useForm } from "react-hook-form";

interface LoginFormData extends Record<string, unknown> {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField<LoginFormData>
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
        required
      />
      <FormField<LoginFormData>
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        errors={errors}
        required
      />
      <Button type="submit" className="w-full" loading={loading}>
        Login
      </Button>
    </form>
  );
};
