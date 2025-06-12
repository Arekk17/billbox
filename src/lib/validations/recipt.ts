import { z } from "zod";
import { validateFileSize, validateFileType } from "@/constants/file";

export const receiptSchema = z.object({
  id: z.string().optional(),

  title: z
    .string()
    .min(1, "Tytuł jest wymagany")
    .max(100, "Tytuł jest za długi"),

  description: z.string().max(500, "Opis jest za długi").optional(),

  date: z.string().min(1, "Data jest wymagana"),

  amount: z
    .number({
      required_error: "Kwota jest wymagana",
      invalid_type_error: "Kwota musi być liczbą",
    })
    .min(0.01, "Kwota musi być większa niż 0")
    .max(999999.99, "Kwota jest za duża"),

  categoryId: z
    .string({
      required_error: "Kategoria jest wymagana",
    })
    .min(1, "Kategoria jest wymagana"),

  image: z
    .custom<FileList | string | null>()
    .optional()
    .refine(validateFileSize, "Plik nie może być większy niż 2MB")
    .refine(
      validateFileType,
      "Nieprawidłowy format pliku. Dozwolone formaty: JPG, PNG, GIF, WEBP"
    ),
});

export type ReceiptFormData = z.infer<typeof receiptSchema>;
