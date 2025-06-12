import { Category } from "@/lib/validations/category";

export const useCategoryUtils = (categories: Category[]) => {
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
};
