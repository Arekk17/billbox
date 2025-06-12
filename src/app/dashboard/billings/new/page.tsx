import ReceiptForm from "@/components/organisms/Form/ReciptForm";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const user = await getUserFromCookie();
  const userId = user?.uid;
  if (!user || !userId) {
    redirect("/auth/signin");
  }
  const categoriesResult = await getCategoriesByUserId(userId);
  const categories =
    categoriesResult.success && categoriesResult.data
      ? Array.isArray(categoriesResult.data)
        ? categoriesResult.data
        : [categoriesResult.data]
      : [];
  return (
    <div className="container mx-auto p-6">
      <ReceiptForm loading={false} categories={categories} userId={userId} />
    </div>
  );
}
