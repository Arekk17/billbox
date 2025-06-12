"use client";

import { useQuery } from "@tanstack/react-query";
import { startOfMonth, endOfMonth } from "date-fns";
import { getReceipts } from "@/lib/services/recipts.service";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { MonthlyStats } from "@/components/organisms/Reports/MonthlyStats";
import { CategoryChart } from "@/components/organisms/Reports/CategoryChart";
import { RecentReceipts } from "@/components/organisms/Reports/RecentReceipts";
import { Card } from "@/components/molecules/Card";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { ErrorAlert } from "@/components/atoms/ErrorAlert";
import { useUserId } from "@/lib/queries/useUser";

interface Receipt {
  id: string;
  title: string;
  amount: number;
  date: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function ReportPage() {
  const { data: userData, isLoading: userLoading } = useUserId();
  const currentMonth = {
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  };

  const {
    data: receiptsData,
    isLoading: receiptsLoading,
    error: receiptsError,
  } = useQuery({
    queryKey: ["receipts", userData?.id, currentMonth],
    queryFn: () => getReceipts(userData?.id || ""),
    enabled: !!userData?.id,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories", userData?.id],
    queryFn: () => getCategoriesByUserId(userData?.id || ""),
    enabled: !!userData?.id,
  });

  if (userLoading || receiptsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return <ErrorAlert message="Nie jesteś zalogowany" />;
  }

  if (receiptsError) {
    return <ErrorAlert message="Nie udało się załadować danych raportów" />;
  }

  const receipts = (receiptsData?.data || []) as Receipt[];
  const categories = (categoriesData?.data || []) as Category[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Raport finansowy</h1>

      {/* Monthly Statistics */}
      <Card>
        <MonthlyStats receipts={receipts} />
      </Card>

      {/* Category Chart */}
      <Card>
        <CategoryChart receipts={receipts} categories={categories} />
      </Card>

      {/* Recent Receipts */}
      <Card>
        <RecentReceipts receipts={receipts} categories={categories} />
      </Card>

      {/* TODO: Future Enhancements */}
      {/* 
        1. Date range filter
        2. Export to PDF
        3. Category comparison
        4. Monthly trends
        5. Budget tracking
        6. Custom date ranges
        7. Advanced analytics
        8. Data visualization options
      */}
    </div>
  );
}
