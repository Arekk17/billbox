"use client";

import { Button } from "@/components/atoms/Buttons/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  totalPages?: number;
}
export const Pagination = ({ currentPage, hasMore }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        className="btn btn-ghost"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaChevronLeft className="h-4 w-4" />
        <span className="ml-2">Poprzednia strona</span>
      </Button>

      <span className="text-sm text-gray-500">Strona {currentPage}</span>

      <Button
        className="btn btn-ghost"
        disabled={!hasMore}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span className="mr-2">Następna strona</span>
        <FaChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
