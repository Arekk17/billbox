"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { resetPassword } from "@/lib/services/auth.service";
import { Input } from "@/components/atoms/Fields/Input";
import { Button } from "@/components/atoms/Buttons/Button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError("");
    try {
      const response = await resetPassword(data.email);
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || "Wystąpił błąd podczas resetowania hasła");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Resetowanie hasła</h1>

      {success ? (
        <div className="alert alert-success mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Link do resetowania hasła został wysłany na podany adres email.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
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
              <span>{error}</span>
            </div>
          )}

          <Input<ForgotPasswordFormData>
            name="email"
            type="email"
            label="Email"
            placeholder="Wprowadź swój email"
            register={register}
            errors={errors}
            required
          />

          <Button type="submit" className="w-full" loading={loading}>
            Wyślij link do resetowania hasła
          </Button>

          <div className="text-center mt-4">
            <span className="text-sm text-base-content/70">
              Pamiętasz hasło?{" "}
              <Link
                href="/auth/login"
                className="link link-primary font-medium"
              >
                Zaloguj się
              </Link>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
