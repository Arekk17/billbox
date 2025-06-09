"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/Fields/Input";
import { ReceiptFormData, receiptSchema } from "@/lib/validations/recipt";
import { Select } from "@/components/atoms/Fields/Select";
import { FileInput } from "@/components/atoms/Fields/FileInput";
import { Button } from "@/components/atoms/Buttons/Button";
import { ReceiptFormProps } from "@/lib/types/recips";
import { toast } from "react-toastify";
import { addReceipt } from "@/lib/services/recipts.service";
import { DateInput } from "@/components/atoms/Fields/DateInput";
import { Textarea } from "@/components/atoms/Fields/Textarea";

const ReceiptForm = ({ loading, categories, userId }: ReceiptFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    mode: "onSubmit",
    defaultValues: {
      image: undefined,
    },
  });

  console.log("Form errors:", errors);

  const handleReceiptSubmit = async (data: ReceiptFormData) => {
    console.log("handleReceiptSubmit called", data);
    try {
      const result = await addReceipt(data, userId);
      if (result.success) {
        reset();
        toast.success("Paragon dodany pomyślnie");
      } else {
        toast.error(result.error || "Wystąpił błąd podczas dodawania paragonu");
      }
    } catch (error) {
      console.error("Error creating receipt: ", error);
      toast.error("Wystąpił błąd podczas dodawania paragonu");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleReceiptSubmit)}
      className="grid grid-cols-1 gap-4"
    >
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
        <Button type="submit" className="w-full" loading={loading}>
          Dodaj paragon
        </Button>
      </div>
    </form>
  );
};

export default ReceiptForm;
