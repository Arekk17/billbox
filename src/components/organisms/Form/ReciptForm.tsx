"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/Fields/Input";
import { ReceiptFormData, receiptSchema } from "@/lib/validations/recipt";
import { Select } from "@/components/atoms/Fields/Select";
import { FileInput } from "@/components/atoms/Fields/FileInput";
import { Button } from "@/components/atoms/Buttons/Button";
import { ReceiptFormProps } from "@/lib/types/recips";

const ReceiptForm = ({ onSubmit, loading, categories }: ReceiptFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    mode: "onSubmit",
    defaultValues: {
      image: undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <Input<ReceiptFormData>
        name="title"
        type="text"
        label="Tytuł"
        placeholder="Wprowadź tytuł paragonu"
        register={register}
        errors={errors}
        required
      />
      <Input<ReceiptFormData>
        name="description"
        type="text"
        label="Opis"
        placeholder="Wprowadź opis paragonu"
        register={register}
        errors={errors}
      />
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

      <Select<ReceiptFormData>
        name="categoryId"
        label="Kategoria"
        placeholder="Wybierz kategorię"
        register={register}
        errors={errors}
        required
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />
      <FileInput<ReceiptFormData>
        name="image"
        label="Dodaj obraz"
        register={register}
        errors={errors}
        maxSize={2}
      />
      <div className="col-span-2">
        <Button type="submit" className="w-full" loading={loading}>
          Dodaj paragon
        </Button>
      </div>
    </form>
  );
};

export default ReceiptForm;
