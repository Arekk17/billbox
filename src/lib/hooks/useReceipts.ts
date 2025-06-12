import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getReceipts } from "../services/recipts.service";
import { ReceiptFormData } from "../validations/recipt";

export const receiptsKeys = {
  all: ["receipts"] as const,
  lists: () => [...receiptsKeys.all, "list"] as const,
  list: (userId: string, limit?: number) =>
    [...receiptsKeys.lists(), userId, limit] as const,
};

export const useReceipts = (userId: string, limit?: number) => {
  return useQuery({
    queryKey: receiptsKeys.list(userId, limit),
    queryFn: async () => {
      const result = await getReceipts(userId, limit);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const updateReceiptsCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  userId: string,
  newReceipt: ReceiptFormData
) => {
  queryClient.setQueryData<ReceiptFormData[]>(
    receiptsKeys.list(userId),
    (oldData) => {
      if (!oldData) return [newReceipt];
      return [newReceipt, ...oldData];
    }
  );
};
