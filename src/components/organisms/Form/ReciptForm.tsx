"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReceiptFormData, receiptSchema } from "@/lib/validations/recipt";
import { ReceiptFormProps } from "@/lib/types/recips";
import { toast } from "react-toastify";
import { addReceipt } from "@/lib/services/recipts.service";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateReceiptsCache } from "@/lib/hooks/useReceipts";
import { ReceiptFormFields } from "@/components/molecules/Form/ReceiptFormFields";
import { CategoryModal } from "@/components/organisms/Modal/CategoryModal";

const ReceiptForm = ({ categories, userId, onSuccess }: ReceiptFormProps) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const queryClient = useQueryClient();

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

  const handleReceiptSubmit = async (data: ReceiptFormData) => {
    try {
      const result = await addReceipt(data, userId);
      if (result.success) {
        reset();
        toast.success("Paragon dodany pomyślnie");
        updateReceiptsCache(queryClient, userId, data);
        onSuccess?.();
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
        <ReceiptFormFields
          register={register}
          errors={errors}
          categories={categories}
          onAddCategory={() => setIsAddingCategory(true)}
        />
      </form>

      <CategoryModal
        isOpen={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
        userId={userId}
      />
    </>
  );
};

export default ReceiptForm;
