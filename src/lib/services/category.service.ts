import { Category } from "@/lib/validations/category";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export interface CategoryResponse {
  success: boolean;
  data?: Category | Category[];
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

export const addCategory = async (
  category: Omit<Category, "id">
): Promise<CategoryResponse> => {
  try {
    const categoriesRef = collection(db, "categories");
    const docRef = await addDoc(categoriesRef, category);

    return {
      success: true,
      data: [
        {
          id: docRef.id,
          ...category,
        },
      ],
    };
  } catch (error) {
    console.error("Error adding category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};

export const updateCategory = async (
  categoryId: string,
  data: Partial<Omit<Category, "id">>
): Promise<CategoryResponse> => {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await updateDoc(categoryRef, data);

    return {
      success: true,
      data: {
        id: categoryId,
        ...data,
      } as Category,
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
