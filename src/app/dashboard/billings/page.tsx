import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { Button } from "@/components/atoms/Buttons/Button";
import { FaPlus } from "react-icons/fa";
import { ReceiptsList } from "@/components/organisms/Widgets/ReceiptsList";
import { redirect } from "next/navigation";
import Link from "next/link";
type Params = Promise<{ page?: string }>;

interface PageProps {
  searchParams: Params;
}

export default async function ReceiptsPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 10;
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/auth/signin");
  }

  const userId = user.uid;
  await getCategoriesByUserId(userId);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paragony</h1>
        <Link href="/dashboard/billings/new">
          <Button className="btn btn-primary">
            <span className="flex items-center">
              <FaPlus className="mr-2" />
              Dodaj paragon
            </span>
          </Button>
        </Link>
      </div>

      <ReceiptsList
        showPagination={true}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
