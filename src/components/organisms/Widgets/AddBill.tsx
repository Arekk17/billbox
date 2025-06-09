"use client";
import { WidgetTemplate } from "@/components/templates/WidgetTemplate";
import React from "react";
import ReceiptForm from "../Form/ReciptForm";
import { useUserId } from "@/lib/queries/useUser";
import { useCategories } from "@/lib/queries/useCategories";

export const AddBill = () => {
  const { data: user, isLoading: isUserLoading } = useUserId();
  const userId = user?.id;
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories(userId);

  if (isUserLoading || isCategoriesLoading) {
    return <div>Ładowanie...</div>;
  }

  if (!user || !userId) {
    return <div>Musisz być zalogowany, aby dodać paragon</div>;
  }
  return (
    <WidgetTemplate title="Dodaj rachunek">
      <ReceiptForm loading={false} categories={categories} userId={userId} />
    </WidgetTemplate>
  );
};
