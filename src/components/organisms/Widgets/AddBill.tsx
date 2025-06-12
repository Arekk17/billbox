import { WidgetTemplate } from "@/components/templates/WidgetTemplate";
import ReceiptForm from "../Form/ReciptForm";
import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { FaExclamationCircle } from "react-icons/fa";

export const AddBill = async () => {
  const user = await getUserFromCookie();
  const userId = user?.uid;

  if (!user || !userId) {
    return (
      <div className="alert alert-error">
        <FaExclamationCircle className="h-6 w-6" />
        <span>Musisz być zalogowany, aby dodać paragon</span>
      </div>
    );
  }

  const categoriesResult = await getCategoriesByUserId(userId);
  const categories =
    categoriesResult.success && categoriesResult.data
      ? Array.isArray(categoriesResult.data)
        ? categoriesResult.data
        : [categoriesResult.data]
      : [];

  return (
    <WidgetTemplate title="Dodaj rachunek">
      <ReceiptForm loading={false} categories={categories} userId={userId} />
    </WidgetTemplate>
  );
};
