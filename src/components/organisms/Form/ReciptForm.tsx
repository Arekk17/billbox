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
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { addCategory } from "@/lib/services/category.service";
import { Modal } from "../Modal/Modal";
import { HexColorPicker } from "react-colorful";

const ReceiptForm = ({ loading, categories, userId }: ReceiptFormProps) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#000000");
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Nazwa kategorii jest wymagana");
      return;
    }

    setIsSubmittingCategory(true);
    try {
      const result = await addCategory({
        name: newCategoryName.trim(),
        userId,
        color: newCategoryColor,
      });

      if (result.success && result.data) {
        toast.success("Kategoria dodana pomyślnie");
        setNewCategoryName("");
        setNewCategoryColor("#000000");
        setIsAddingCategory(false);
        window.location.reload();
      } else {
        toast.error(
          result.error || "Wystąpił błąd podczas dodawania kategorii"
        );
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Wystąpił błąd podczas dodawania kategorii");
    } finally {
      setIsSubmittingCategory(false);
    }
  };

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
    <>
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
                  onClick={() => setIsAddingCategory(true)}
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
          <Button type="submit" className="w-full" loading={loading}>
            Dodaj paragon
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
        title="Dodaj nową kategorię"
        primaryButton={{
          text: "Dodaj",
          onClick: handleAddCategory,
          loading: isSubmittingCategory,
        }}
        secondaryButton={{
          text: "Anuluj",
          onClick: () => setIsAddingCategory(false),
        }}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nazwa kategorii"
            className="input input-bordered w-full"
          />
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium">Kolor kategorii</span>
            </label>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg border border-gray-200"
                style={{ backgroundColor: newCategoryColor }}
              />
              <input
                type="text"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="input input-bordered flex-1"
                placeholder="#000000"
              />
            </div>
            <div className="mt-2">
              <HexColorPicker
                color={newCategoryColor}
                onChange={setNewCategoryColor}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReceiptForm;
