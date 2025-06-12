import { Button } from "@/components/atoms/Buttons/Button";
import { Input } from "@/components/atoms/Fields/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { LoginFormProps } from "@/lib/types/form";
import { loginWithGoogle } from "@/lib/services/auth.service";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success && result.user) {
        router.push("/dashboard");
      } else {
        console.error(
          "Wystąpił błąd podczas logowania przez Google:",
          result.error
        );
      }
    } catch (error) {
      console.error("Błąd podczas logowania przez Google:", error);
    }
  };

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
      <div className="mt-4">
        <Link
          href="/auth/forgot-password"
          className="link link-primary text-sm"
        >
          Zapomniałeś hasła?
        </Link>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Zaloguj się
      </Button>
      <Button type="button" className="w-full" onClick={handleGoogleLogin}>
        <span className="flex items-center gap-2">
          <FaGoogle />
          Zaloguj się przez Google
        </span>
      </Button>
    </form>
  );
};
