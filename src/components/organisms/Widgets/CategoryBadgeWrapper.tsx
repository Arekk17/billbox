"use client";

import { Category } from "@/lib/validations/category";
import { CategoryBadge } from "@/components/molecules/CategoryBadge/CategoryBadge";
import { useCategoryUtils } from "@/lib/hooks/useCategoryUtils";

interface CategoryBadgeWrapperProps {
  categoryId: string;
  categories: Category[];
  size?: "sm" | "lg";
}

export const CategoryBadgeWrapper = ({
  categoryId,
  categories,
  size = "lg",
}: CategoryBadgeWrapperProps) => {
  const { getCategoryName, getCategoryColor } = useCategoryUtils(categories);

  return (
    <CategoryBadge
      name={getCategoryName(categoryId)}
      color={getCategoryColor(categoryId)}
      size={size}
    />
  );
};
