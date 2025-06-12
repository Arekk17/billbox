"use client";
import { useUserId } from "@/lib/queries/useUser";
import { useCategories } from "@/lib/queries/useCategories";
import { Category } from "@/lib/validations/category";
import { Button } from "@/components/atoms/Buttons/Button";
import { FaPlus, FaEdit } from "react-icons/fa";
import { UseQueryResult } from "@tanstack/react-query";
import { CategoryModal } from "@/components/organisms/Modal/CategoryModal";
import { useCategoryModal } from "@/lib/hooks/useCategoryModal";

export default function CategoriesPage() {
  const { data: user, isLoading: isUserLoading } = useUserId();
  const userId = user?.id;
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    refetch,
  } = useCategories(userId) as UseQueryResult<Category[], Error>;
  const {
    isModalOpen,
    modalMode,
    editingCategory,
    handleModalAction,
    handleModalClose,
  } = useCategoryModal();

  if (isUserLoading || isCategoriesLoading) {
    return <div>Ładowanie...</div>;
  }

  if (!user || !userId) {
    return <div>Musisz być zalogowany, aby zobaczyć kategorie</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategorie</h1>
        <Button
          onClick={() => handleModalAction("add")}
          className="btn btn-primary"
        >
          <span className="flex items-center">
            <FaPlus className="mr-2" />
            Dodaj kategorię
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <div className="flex flex-col gap-2">
                <div
                  className="w-full h-8 rounded-lg"
                  style={{ backgroundColor: category.color }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="card-title text-base">{category.name}</h2>
                    <p className="text-sm text-gray-500">{category.color}</p>
                  </div>
                  <Button
                    onClick={() => handleModalAction("edit", category)}
                    className="btn btn-ghost btn-sm"
                  >
                    <FaEdit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userId={userId}
        mode={modalMode}
        category={editingCategory || undefined}
        onSuccess={refetch}
      />
    </div>
  );
}
