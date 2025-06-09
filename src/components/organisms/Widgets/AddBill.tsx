"use client";
import { WidgetTemplate } from "@/components/templates/WidgetTemplate";
import React from "react";
import ReceiptForm from "../Form/ReciptForm";
import { ReceiptFormData } from "@/lib/validations/recipt";
import { useUserId } from "@/lib/queries/useUser";
import { useCategories } from "@/lib/queries/useCategories";
import { addReceipt } from "@/lib/services/recipts.service";
import { toast } from "react-toastify";

export const AddBill = () => {
  const { data: user, isLoading: isUserLoading } = useUserId();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories(user?.id);
  const handleSubmit = async (data: ReceiptFormData) => {
    try {
      const response = await addReceipt(data);
      if (response.success) {
        toast.success("Paragon dodany pomyślnie");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error adding receipt: ", error);
    }
  };
  if (isUserLoading || isCategoriesLoading) {
    return <div>Ładowanie...</div>;
  }

  if (!user) {
    return <div>Musisz być zalogowany, aby dodać paragon</div>;
  }
  return (
    <WidgetTemplate title="Dodaj rachunek">
      <ReceiptForm
        onSubmit={handleSubmit}
        loading={false}
        categories={categories}
      />
    </WidgetTemplate>
  );
};
