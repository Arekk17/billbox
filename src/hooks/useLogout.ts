"use client";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await logout();
      if (response.success) {
        router.push("/auth/login");
      } else {
        console.error("Logout failed:", response.error);
        alert("Wystąpił błąd podczas wylogowywania. Spróbuj ponownie.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Wystąpił błąd podczas wylogowywania. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
};
