import { getReceiptById } from "@/lib/services/recipts.service";
import { ReceiptFormData } from "@/lib/validations/recipt";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { Category } from "@/lib/validations/category";
import { Button } from "@/components/atoms/Buttons/Button";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { CategoryBadge } from "@/components/molecules/CategoryBadge/CategoryBadge";
import { DateDisplay } from "@/components/molecules/DateDisplay/DateDisplay";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { redirect } from "next/navigation";

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

async function getCategoryUtils(categories: Category[]) {
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || "#000000";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || "Nieznana kategoria";
  };

  return {
    getCategoryColor,
    getCategoryName,
  };
}

export default async function ReceiptDetailsPage({ params }: PageProps) {
  const user = await getUserFromCookie();
  if (!user) {
    redirect("/auth/signin");
  }

  const { id } = await params;
  const userId = user.uid;

  const [receiptResult, categoriesResult] = await Promise.all([
    getReceiptById(id),
    getCategoriesByUserId(userId),
  ]);

  if (!receiptResult.success || !receiptResult.data) {
    return (
      <div className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>Nie znaleziono paragonu</span>
      </div>
    );
  }

  const receipt = receiptResult.data as ReceiptFormData;
  const categories = Array.isArray(categoriesResult.data)
    ? categoriesResult.data
    : [];
  const { getCategoryColor, getCategoryName } = await getCategoryUtils(
    categories
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <Link href="/dashboard/billings">
          <Button className="btn btn-primary">
            <span className="flex items-center">
              <FaArrowLeft className="mr-2" />
              Powrót do listy
            </span>
          </Button>
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lewa kolumna - Informacje */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col gap-2">
                <CategoryBadge
                  name={getCategoryName(receipt.categoryId)}
                  color={getCategoryColor(receipt.categoryId)}
                />
                <h1 className="text-3xl font-bold">{receipt.title}</h1>
                <DateDisplay date={receipt.date} />
              </div>

              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <FaMoneyBillWave className="h-8 w-8" />
                  </div>
                  <div className="stat-title text-lg">Kwota</div>
                  <div className="stat-value text-primary text-4xl">
                    {receipt.amount.toFixed(2)} zł
                  </div>
                </div>
              </div>

              {receipt.description && (
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Opis</h2>
                    <p className="text-lg">{receipt.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Prawa kolumna - Zdjęcie */}
            {receipt.image && (
              <div className="card bg-base-200 h-fit">
                <div className="card-body">
                  <h2 className="card-title text-xl mb-4">Zdjęcie paragonu</h2>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-base-100">
                    <Image
                      src={receipt.image as string}
                      alt="Zdjęcie paragonu"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
