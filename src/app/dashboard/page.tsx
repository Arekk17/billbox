import { AddBill } from "@/components/organisms/Widgets/AddBill";
import { ReceiptsList } from "@/components/organisms/Widgets/ReceiptsList";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <AddBill />
      <div className="md:col-span-2 lg:col-span-2">
        <ReceiptsList />
      </div>
    </div>
  );
}
