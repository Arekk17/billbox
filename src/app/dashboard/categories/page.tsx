"use client";
import { useUserId } from "@/lib/queries/useUser";
import { useCategories } from "@/lib/queries/useCategories";
import { Category } from "@/lib/validations/category";
import { useState } from "react";
import { Button } from "@/components/atoms/Buttons/Button";
import { Modal } from "@/components/molecules/Modal/Modal";
import { FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { addCategory, updateCategory } from "@/lib/services/category.service";
import { HexColorPicker } from "react-colorful";
import { UseQueryResult } from "@tanstack/react-query";

export default function CategoriesPage() {
  const { data: user, isLoading: isUserLoading } = useUserId();
  const userId = user?.id;
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    refetch,
  } = useCategories(userId) as UseQueryResult<Category[], Error>;
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#000000");
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Nazwa kategorii jest wymagana");
      return;
    }

    setIsSubmittingCategory(true);
    try {
      const result = await addCategory({
        name: newCategoryName.trim(),
        userId: userId!,
        color: newCategoryColor,
      });

      if (result.success && result.data) {
        toast.success("Kategoria dodana pomyślnie");
        setNewCategoryName("");
        setNewCategoryColor("#000000");
        setIsAddingCategory(false);
        refetch();
      } else {
        toast.error(
          result.error || "Wystąpił błąd podczas dodawania kategorii"
        );
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Wystąpił błąd podczas dodawania kategorii");
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory || !newCategoryName.trim()) {
      toast.error("Nazwa kategorii jest wymagana");
      return;
    }

    setIsSubmittingCategory(true);
    try {
      const result = await updateCategory(editingCategory.id!, {
        name: newCategoryName.trim(),
        color: newCategoryColor,
      });

      if (result.success && result.data) {
        toast.success("Kategoria zaktualizowana pomyślnie");
        setNewCategoryName("");
        setNewCategoryColor("#000000");
        setIsEditingCategory(false);
        setEditingCategory(null);
        refetch();
      } else {
        toast.error(
          result.error || "Wystąpił błąd podczas aktualizacji kategorii"
        );
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Wystąpił błąd podczas aktualizacji kategorii");
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryColor(category.color || "#000000");
    setIsEditingCategory(true);
  };

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
          onClick={() => setIsAddingCategory(true)}
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
                    onClick={() => handleEditClick(category)}
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

      <Modal
        isOpen={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
        title="Dodaj nową kategorię"
        primaryButton={{
          text: "Dodaj",
          onClick: handleAddCategory,
          loading: isSubmittingCategory,
        }}
        secondaryButton={{
          text: "Anuluj",
          onClick: () => setIsAddingCategory(false),
        }}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nazwa kategorii"
            className="input input-bordered w-full"
          />
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium">Kolor kategorii</span>
            </label>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg border border-gray-200"
                style={{ backgroundColor: newCategoryColor }}
              />
              <input
                type="text"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="input input-bordered flex-1"
                placeholder="#000000"
              />
            </div>
            <div className="mt-2">
              <HexColorPicker
                color={newCategoryColor}
                onChange={setNewCategoryColor}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditingCategory}
        onClose={() => {
          setIsEditingCategory(false);
          setEditingCategory(null);
          setNewCategoryName("");
          setNewCategoryColor("#000000");
        }}
        title="Edytuj kategorię"
        primaryButton={{
          text: "Zapisz",
          onClick: handleEditCategory,
          loading: isSubmittingCategory,
        }}
        secondaryButton={{
          text: "Anuluj",
          onClick: () => {
            setIsEditingCategory(false);
            setEditingCategory(null);
            setNewCategoryName("");
            setNewCategoryColor("#000000");
          },
        }}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nazwa kategorii"
            className="input input-bordered w-full"
          />
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium">Kolor kategorii</span>
            </label>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg border border-gray-200"
                style={{ backgroundColor: newCategoryColor }}
              />
              <input
                type="text"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="input input-bordered flex-1"
                placeholder="#000000"
              />
            </div>
            <div className="mt-2">
              <HexColorPicker
                color={newCategoryColor}
                onChange={setNewCategoryColor}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
