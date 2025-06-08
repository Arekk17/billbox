"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/organisms/Form/LoginForm";
import { login } from "@/services/auth.service";
import type { LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await login(data);
      if (!response.success) {
        throw new Error(response.error || "Wystąpił błąd podczas logowania");
      }
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Wystąpił nieoczekiwany błąd podczas logowania");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-body">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">Zaloguj się</h1>
        <p className="text-base-content/70 mt-2">
          Witaj ponownie! Zaloguj się, aby kontynuować
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      )}

      <LoginForm onSubmit={handleSubmit} loading={loading} />

      <div className="text-center mt-4">
        <span className="text-sm text-base-content/70">
          Nie masz konta?{" "}
          <Link href="/auth/register" className="link link-primary font-medium">
            Zarejestruj się
          </Link>
        </span>
      </div>
    </div>
  );
}
