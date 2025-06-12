"use client";
import ReceiptForm from "@/components/organisms/Form/ReciptForm";
import { useUserId } from "@/lib/queries/useUser";
import { redirect } from "next/navigation";

export default function NewBillingPage() {
  const { data: user, isLoading } = useUserId();
  const userId = user?.id;

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (!user || !userId) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto p-6">
      <ReceiptForm userId={userId} />
    </div>
  );
}
