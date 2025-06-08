import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Pole jest wymagane")
      .email("Nieprawidłowy adres email")
      .trim()
      .toLowerCase(),
    firstName: z
      .string({ required_error: "Pole jest wymagane" })
      .min(1, "Pole jest wymagane")
      .trim(),
    lastName: z
      .string({ required_error: "Pole jest wymagane" })
      .min(1, "Pole jest wymagane")
      .trim(),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
    confirmPassword: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
