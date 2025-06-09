import { Category } from "@/lib/validations/category";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export interface CategoryResponse {
  success: boolean;
  data?: Category[];
  error?: string;
}

export const getCategoriesByUserId = async (
  userId: string
): Promise<CategoryResponse> => {
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: "Kategorie nie znalezione",
      };
    }

    const categoriesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];

    return {
      success: true,
      data: categoriesData,
    };
  } catch (error) {
    console.error("Error getting categories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
