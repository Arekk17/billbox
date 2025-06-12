import { useState } from "react";
import { Category } from "@/lib/validations/category";

interface UseCategoryModalReturn {
  isModalOpen: boolean;
  modalMode: "add" | "edit";
  editingCategory: Category | null;
  handleModalAction: (mode: "add" | "edit", category?: Category) => void;
  handleModalClose: () => void;
}

export const useCategoryModal = (): UseCategoryModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleModalAction = (mode: "add" | "edit", category?: Category) => {
    setModalMode(mode);
    setEditingCategory(category || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return {
    isModalOpen,
    modalMode,
    editingCategory,
    handleModalAction,
    handleModalClose,
  };
};
