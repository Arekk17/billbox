import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "@/lib/firebase/firebase";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export const userService = {
  async getProfile(): Promise<User | null> {
    // TODO: Zaimplementuj pobieranie profilu z Firestore
    throw new Error("Not implemented");
  },

  async updateProfile(data: UpdateUserData): Promise<User> {
    // TODO: Zaimplementuj aktualizację profilu w Firestore
    throw new Error("Not implemented");
  },

  async deleteAccount(): Promise<void> {
    // TODO: Zaimplementuj usuwanie konta (zarówno z Auth jak i Firestore)
    throw new Error("Not implemented");
  },
};
