import { useMemo } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Badge } from "@/components/atoms/Badge";

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

interface RecentReceiptsProps {
  receipts: Receipt[];
  categories: Category[];
}

export function RecentReceipts({ receipts, categories }: RecentReceiptsProps) {
  const recentReceipts = useMemo(() => {
    return receipts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map((receipt) => {
        const category = categories.find((c) => c.id === receipt.categoryId);
        return {
          ...receipt,
          category,
        };
      });
  }, [receipts, categories]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Ostatnie rachunki</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tytuł</th>
              <th>Kategoria</th>
              <th className="text-right">Kwota</th>
            </tr>
          </thead>
          <tbody>
            {recentReceipts.map((receipt) => (
              <tr key={receipt.id} className="hover">
                <td className="whitespace-nowrap">
                  {format(new Date(receipt.date), "d MMM yyyy", { locale: pl })}
                </td>
                <td>{receipt.title}</td>
                <td>
                  {receipt.category && (
                    <Badge color={receipt.category.color}>
                      {receipt.category.name}
                    </Badge>
                  )}
                </td>
                <td className="text-right font-medium">
                  {receipt.amount.toFixed(2)} zł
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
