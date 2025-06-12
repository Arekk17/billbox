"use client";
import { WidgetTemplate } from "@/components/templates/WidgetTemplate";
import { useUserId } from "@/lib/queries/useUser";
import { useCategories } from "@/lib/queries/useCategories";
import { Category } from "@/lib/validations/category";
import { useEffect, useState } from "react";
import { getReceipts } from "@/lib/services/recipts.service";
import { ReceiptFormData } from "@/lib/validations/recipt";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const ReceiptsList = () => {
  const { data: user, isLoading: isUserLoading } = useUserId();
  const userId = user?.id;
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories(userId) as { data: Category[]; isLoading: boolean };
  const [receipts, setReceipts] = useState<ReceiptFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      if (!userId) return;
      setIsLoading(true);
      const result = await getReceipts(userId);
      if (result.success && result.data) {
        setReceipts(result.data as ReceiptFormData[]);
      }
      setIsLoading(false);
    };

    fetchReceipts();
  }, [userId]);

  if (isUserLoading || isCategoriesLoading || isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (!user || !userId) {
    return <div>Musisz być zalogowany, aby zobaczyć paragony</div>;
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || "#000000";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || "Nieznana kategoria";
  };

  return (
    <WidgetTemplate title="Lista paragonów">
      <div className="space-y-4">
        {receipts.length === 0 ? (
          <p className="text-center text-gray-500">Brak paragonów</p>
        ) : (
          receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{receipt.title}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(receipt.date), "d MMMM yyyy", {
                      locale: pl,
                    })}
                  </p>
                  {receipt.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {receipt.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${getCategoryColor(
                        receipt.categoryId
                      )}20`,
                      color: getCategoryColor(receipt.categoryId),
                    }}
                  >
                    {getCategoryName(receipt.categoryId)}
                  </div>
                  <div className="text-lg font-semibold">
                    {receipt.amount.toFixed(2)} zł
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </WidgetTemplate>
  );
};
