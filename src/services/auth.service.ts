import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
} from "@/lib/validations/auth";

export interface AuthResponse {
  user: {
    id: string;
    email: string | null;
    name: string | null;
  };
}

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    // TODO: Zaimplementuj logowanie przez Firebase
    throw new Error("Not implemented");
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    // TODO: Zaimplementuj rejestrację przez Firebase
    throw new Error("Not implemented");
  },

  async forgotPassword(data: ForgotPasswordFormData): Promise<void> {
    // TODO: Zaimplementuj resetowanie hasła przez Firebase
    throw new Error("Not implemented");
  },

  async logout(): Promise<void> {
    // TODO: Zaimplementuj wylogowanie przez Firebase
    throw new Error("Not implemented");
  },

  async getCurrentUser(): Promise<AuthResponse | null> {
    // TODO: Zaimplementuj pobieranie aktualnego użytkownika
    throw new Error("Not implemented");
  },
};
