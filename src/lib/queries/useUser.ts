import { useQuery } from "@tanstack/react-query";

type UserData = {
  id: string;
  email: string | undefined;
} | null;

export const useUserId = () => {
  return useQuery<UserData, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/me");
      if (!response.ok) {
        return null;
      }
      return response.json();
    },
  });
};
