import { z } from "zod";

// Schemat dla kategorii
export const categorySchema = z.object({
  id: z.string().optional(), // opcjonalne, bo będzie generowane przy tworzeniu
  name: z
    .string()
    .min(1, "Nazwa kategorii jest wymagana")
    .max(50, "Nazwa kategorii jest za długa"),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Nieprawidłowy format koloru")
    .default("#000000")
    .optional(),
  icon: z
    .string()
    .min(1, "Ikona jest wymagana")
    .max(50, "Nazwa ikony jest za długa")
    .optional(),
  userId: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
