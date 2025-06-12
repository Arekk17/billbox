import { Button } from "@/components/atoms/Buttons/Button";
import { AddBill } from "@/components/organisms/Widgets/AddBill";
import { ReceiptsList } from "@/components/organisms/Widgets/ReceiptsList";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <AddBill />
      <div className="md:col-span-2 lg:col-span-2">
        <ReceiptsList limit={3} />
        <div className="mt-4 text-center">
          <Link href="/dashboard/billings">
            <Button>
              <span className="flex items-center">
                Zobacz wszystkie paragony <FaArrowRight className="ml-2" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
