"use client";

import { WidgetTemplate } from "@/components/templates/WidgetTemplate";
import { ReceiptFormData } from "@/lib/validations/recipt";
import Link from "next/link";
import { FaReceipt, FaExclamationCircle } from "react-icons/fa";
import { DateDisplay } from "@/components/molecules/DateDisplay/DateDisplay";
import { ImageModal } from "../Modal/ImageModal";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { CategoryBadgeWrapper } from "./CategoryBadgeWrapper";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { useReceipts } from "@/lib/hooks/useReceipts";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/lib/validations/category";
import { useUserId } from "@/lib/queries/useUser";

interface ReceiptsListProps {
  limit?: number;
  showPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
}

export const ReceiptsList = ({
  limit,
  showPagination = false,
  pageSize = 10,
  currentPage = 1,
}: ReceiptsListProps) => {
  const { data: userData } = useUserId();
  const userId = userData?.id;

  const { data: receipts = [] } = useReceipts(userId || "", limit || pageSize);
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories", userId],
    queryFn: async () => {
      const result = await getCategoriesByUserId(userId || "");
      if (!result.success) {
        throw new Error(result.error);
      }
      const categories = Array.isArray(result.data)
        ? result.data
        : [result.data];
      return categories.filter(
        (category): category is Category => category !== undefined
      );
    },
    enabled: !!userId,
  });

  if (!userId) {
    return (
      <div className="alert alert-error">
        <FaExclamationCircle className="h-6 w-6" />
        <span>Musisz być zalogowany, aby zobaczyć paragony</span>
      </div>
    );
  }

  return (
    <WidgetTemplate title="Lista paragonów">
      <div className="space-y-4">
        {receipts.length === 0 ? (
          <div className="alert">
            <FaReceipt className="h-6 w-6" />
            <span>Brak paragonów</span>
          </div>
        ) : (
          <>
            {(receipts as ReceiptFormData[]).map((receipt) => (
              <div
                key={receipt.id}
                className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
              >
                <div className="card-body">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CategoryBadgeWrapper
                          categoryId={receipt.categoryId}
                          categories={categories}
                          size="sm"
                        />
                        <div className="text-lg font-semibold text-primary">
                          {receipt.amount.toFixed(2)} zł
                        </div>
                      </div>
                      {receipt.image && (
                        <ImageModal imageUrl={receipt.image as string} />
                      )}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/dashboard/billings/${receipt.id}`}
                          className="hover:underline"
                        >
                          <h3 className="font-semibold text-lg">
                            {receipt.title}
                          </h3>
                        </Link>
                        <DateDisplay date={receipt.date} size="sm" />
                        {receipt.description && (
                          <p className="text-sm text-gray-500 mt-2">
                            {receipt.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {showPagination && (
              <Pagination
                currentPage={currentPage || 1}
                hasMore={receipts.length === (limit || pageSize)}
              />
            )}
          </>
        )}
      </div>
    </WidgetTemplate>
  );
};
