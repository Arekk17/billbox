import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import {
  CreateUserData,
  createUserSchema,
  UpdateUserData,
  User,
} from "@/lib/validations/user";

export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
}

export const createUser = async (
  userId: string,
  data: CreateUserData
): Promise<UserResponse> => {
  try {
    const validateFields = createUserSchema.safeParse(data);
    if (!validateFields.success) {
      return {
        success: false,
        error: validateFields.error.message,
      };
    }
    const userRef = doc(db, "users", userId);
    const userData: User = {
      id: userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userRef, userData);
    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};

export const getUserById = async (userId: string): Promise<UserResponse> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return {
        success: false,
        error: "Użytkownik nie znaleziony",
      };
    }
    const userData = userDoc.data() as User;
    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};

export const updateUser = async (
  userId: string,
  data: Partial<UpdateUserData>
): Promise<UserResponse> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return {
        success: false,
        error: "Użytkownik nie znaleziony",
      };
    }
    const userData = userDoc.data() as User;
    const updatedData = {
      ...userData,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userRef, updatedData);
    return {
      success: true,
      data: updatedData,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
export const deleteUser = async (userId: string): Promise<UserResponse> => {
  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
