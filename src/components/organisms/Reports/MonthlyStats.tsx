import { useMemo } from "react";

interface Receipt {
  amount: number;
  date: string;
  categoryId: string;
  title: string;
}

interface MonthlyStatsProps {
  receipts: Receipt[];
}

export function MonthlyStats({ receipts }: MonthlyStatsProps) {
  const stats = useMemo(() => {
    const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
    const count = receipts.length;
    const average = count > 0 ? total / count : 0;

    return {
      total,
      count,
      average,
    };
  }, [receipts]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Statystyki miesiąca</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-200 rounded-lg p-4">
          <div className="text-sm text-base-content/70">Suma wydatków</div>
          <div className="text-2xl font-bold">{stats.total.toFixed(2)} zł</div>
        </div>

        <div className="bg-base-200 rounded-lg p-4">
          <div className="text-sm text-base-content/70">Liczba transakcji</div>
          <div className="text-2xl font-bold">{stats.count}</div>
        </div>

        <div className="bg-base-200 rounded-lg p-4">
          <div className="text-sm text-base-content/70">Średnia wartość</div>
          <div className="text-2xl font-bold">
            {stats.average.toFixed(2)} zł
          </div>
        </div>
      </div>
    </div>
  );
}
