"use client";

import { RegisterForm } from "@/components/organisms/Form/RegisterForm";
import { RegisterFormData } from "@/lib/validations/auth";
import { register as registerUser } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await registerUser(data);

      if (response.success) {
        router.push("/dashboard");
      } else {
        throw new Error(response.error || "Wystąpił błąd podczas rejestracji");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rejestracja</h1>
      <RegisterForm onSubmit={handleRegister} loading={loading} />
      <div className="text-center mt-4">
        <span className="text-sm text-base-content/70">
          Masz już konto?{" "}
          <Link href="/auth/login" className="link link-primary font-medium">
            Zaloguj się
          </Link>
        </span>
      </div>
    </div>
  );
}
