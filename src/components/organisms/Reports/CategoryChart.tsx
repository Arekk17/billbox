import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Receipt {
  amount: number;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryChartProps {
  receipts: Receipt[];
  categories: Category[];
}

export function CategoryChart({ receipts, categories }: CategoryChartProps) {
  const chartData = useMemo(() => {
    const categoryTotals = receipts.reduce((acc, receipt) => {
      const categoryId = receipt.categoryId;
      if (!acc[categoryId]) {
        const category = categories.find((c) => c.id === categoryId);
        acc[categoryId] = {
          name: category?.name || "Inne",
          color: category?.color || "#CBD5E1",
          total: 0,
        };
      }
      acc[categoryId].total += receipt.amount;
      return acc;
    }, {} as Record<string, { name: string; color: string; total: number }>);

    return Object.values(categoryTotals)
      .sort((a, b) => b.total - a.total)
      .map((data) => ({
        ...data,
        total: Number(data.total.toFixed(2)),
      }));
  }, [receipts, categories]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Wydatki według kategorii</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)} zł`}
              labelStyle={{ color: "#000" }}
            />
            <Bar
              dataKey="total"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
              label={{
                position: "top",
                formatter: (value: number) => `${value} zł`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
