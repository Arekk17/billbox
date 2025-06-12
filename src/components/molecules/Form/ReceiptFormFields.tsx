import { Input } from "@/components/atoms/Fields/Input";
import { Select } from "@/components/atoms/Fields/Select";
import { FileInput } from "@/components/atoms/Fields/FileInput";
import { Button } from "@/components/atoms/Buttons/Button";
import { DateInput } from "@/components/atoms/Fields/DateInput";
import { Textarea } from "@/components/atoms/Fields/Textarea";
import { FaPlus } from "react-icons/fa";
import { ReceiptFormData } from "@/lib/validations/recipt";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ReceiptFormFieldsProps {
  register: UseFormRegister<ReceiptFormData>;
  errors: FieldErrors<ReceiptFormData>;
  categories: Array<{ id?: string; name: string }>;
  onAddCategory: () => void;
  loading?: boolean;
}

export const ReceiptFormFields = ({
  register,
  errors,
  categories,
  onAddCategory,
  loading = false,
}: ReceiptFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Input<ReceiptFormData>
          name="title"
          type="text"
          label="Tytuł"
          placeholder="Wprowadź tytuł paragonu"
          register={register}
          errors={errors}
          required
        />
        <DateInput<ReceiptFormData>
          name="date"
          label="Data paragonu"
          register={register}
          errors={errors}
          required
        />
        <div className="relative">
          <div className="flex gap-2">
            <div className="flex-1">
              <Select<ReceiptFormData>
                name="categoryId"
                label="Kategoria"
                placeholder="Wybierz kategorię"
                register={register}
                errors={errors}
                required
                options={categories.map((category) => ({
                  value: category.id || "",
                  label: category.name,
                }))}
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={onAddCategory}
                className="btn btn-square btn-primary h-10 w-10"
                title="Dodaj nową kategorię"
              >
                <FaPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Input<ReceiptFormData>
          name="amount"
          type="number"
          label="Kwota"
          placeholder="Kwota paragonu zł"
          register={register}
          errors={errors}
          required
          step="0.01"
          min="0.01"
        />
      </div>

      <Textarea<ReceiptFormData>
        name="description"
        label="Opis paragonu"
        placeholder="Wprowadź opis paragonu..."
        register={register}
        errors={errors}
        rows={4}
        maxLength={500}
        minLength={10}
      />

      <FileInput<ReceiptFormData>
        name="image"
        label="Dodaj obraz"
        register={register}
        errors={errors}
        maxSize={2}
      />

      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Dodawanie..." : "Dodaj paragon"}
        </Button>
      </div>
    </>
  );
};
