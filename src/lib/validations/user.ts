import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy adres email")
    .trim()
    .toLowerCase(),
  firstName: z.string().min(1, "Imię jest wymagane").trim(),
  lastName: z.string().min(1, "Nazwisko jest wymagane").trim(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane").trim().optional(),
  lastName: z.string().min(1, "Nazwisko jest wymagane").trim().optional(),
  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .trim()
    .toLowerCase()
    .optional(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type User = z.infer<typeof userSchema>;
