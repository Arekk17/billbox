import { useQuery } from "@tanstack/react-query";
import { getCategoriesByUserId } from "@/lib/services/category.service";
import { Category } from "../validations/category";

export const useCategories = (userId: string | undefined) => {
  return useQuery<Category[], Error>({
    queryKey: ["categories", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      const response = await getCategoriesByUserId(userId);
      if (!response.success || !response.data) {
        return [];
      }
      return response.data;
    },
    enabled: !!userId,
  });
};
