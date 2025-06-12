"use client";

import { WidgetTemplate } from "@/components/templates/WidgetTemplate";
import { ReceiptFormData } from "@/lib/validations/recipt";
import Link from "next/link";
import { FaReceipt } from "react-icons/fa";
import { DateDisplay } from "@/components/molecules/DateDisplay/DateDisplay";
import { ImageModal } from "../Modal/ImageModal";
import { CategoryBadgeWrapper } from "./CategoryBadgeWrapper";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/lib/validations/category";
import { useUserId } from "@/lib/queries/useUser";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { getReceipts } from "@/lib/services/recipts.service";

interface ReceiptsListProps {
  limit?: number;
  showPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
}

interface Receipt extends ReceiptFormData {
  id: string;
}

export const ReceiptsList = ({
  limit,
  showPagination = true,
  pageSize = 10,
  currentPage = 1,
}: ReceiptsListProps) => {
  const { data: user } = useUserId();
  const userId = user?.id;

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories", userId],
    queryFn: async () => {
      if (!userId) return [];
      const result = await getCategoriesByUserId(userId);
      return result.success && result.data
        ? Array.isArray(result.data)
          ? result.data
          : [result.data]
        : [];
    },
    enabled: !!userId,
  });

  const { data: receipts = [] } = useQuery<Receipt[]>({
    queryKey: ["receipts", userId],
    queryFn: async () => {
      if (!userId) return [];
      const result = await getReceipts(userId);
      return result.success && result.data
        ? Array.isArray(result.data)
          ? (result.data as Receipt[])
          : ([result.data] as Receipt[])
        : [];
    },
    enabled: !!userId,
  });

  const displayedReceipts = limit ? receipts.slice(0, limit) : receipts;
  const hasMore = receipts.length >= pageSize;

  return (
    <WidgetTemplate title="Lista paragonów">
      <div className="space-y-4">
        {displayedReceipts.length === 0 ? (
          <div className="alert">
            <FaReceipt className="h-6 w-6" />
            <span>Brak paragonów</span>
          </div>
        ) : (
          <>
            {displayedReceipts.map((receipt: Receipt) => (
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
                    <div>
                      <h3 className="font-medium">{receipt.title}</h3>
                      {receipt.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {receipt.description}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <DateDisplay date={receipt.date} />
                      <Link
                        href={`/dashboard/billings/${receipt.id}`}
                        className="link link-primary"
                      >
                        Szczegóły
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {showPagination && receipts.length > pageSize && (
              <Pagination currentPage={currentPage} hasMore={hasMore} />
            )}
          </>
        )}
      </div>
    </WidgetTemplate>
  );
};
