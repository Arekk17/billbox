"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReceiptFormData, receiptSchema } from "@/lib/validations/recipt";
import { ReceiptFormProps } from "@/lib/types/recips";
import { toast } from "react-toastify";
import { addReceipt } from "@/lib/services/recipts.service";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ReceiptFormFields } from "@/components/molecules/Form/ReceiptFormFields";
import { CategoryModal } from "@/components/organisms/Modal/CategoryModal";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { Category } from "@/lib/validations/category";

const ReceiptForm = ({
  userId,
  onSuccess,
}: Omit<ReceiptFormProps, "categories">) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories", userId],
    queryFn: async () => {
      const result = await getCategoriesByUserId(userId);
      return result.success && result.data
        ? Array.isArray(result.data)
          ? result.data
          : [result.data]
        : [];
    },
  });

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
    setIsLoading(true);
    try {
      const result = await addReceipt(data, userId);
      if (result.success) {
        reset();
        toast.success("Paragon dodany pomyślnie");
        // Invalidate receipts query to trigger refetch
        await queryClient.invalidateQueries({ queryKey: ["receipts", userId] });
        onSuccess?.();
      } else {
        toast.error(result.error || "Wystąpił błąd podczas dodawania paragonu");
      }
    } catch (error) {
      console.error("Error creating receipt: ", error);
      toast.error("Wystąpił błąd podczas dodawania paragonu");
    } finally {
      setIsLoading(false);
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
          loading={isLoading}
        />
      </form>

      <CategoryModal
        isOpen={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
        userId={userId}
        mode="add"
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["categories", userId] });
        }}
      />
    </>
  );
};

export default ReceiptForm;
