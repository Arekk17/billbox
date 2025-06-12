import { useState } from "react";
import { Modal } from "@/components/molecules/Modal/Modal";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import { addCategory } from "@/lib/services/category.service";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const CategoryModal = ({
  isOpen,
  onClose,
  userId,
}: CategoryModalProps) => {
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
        userId,
        color: newCategoryColor,
      });

      if (result.success && result.data) {
        toast.success("Kategoria dodana pomyślnie");
        setNewCategoryName("");
        setNewCategoryColor("#000000");
        onClose();
        window.location.reload();
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dodaj nową kategorię"
      primaryButton={{
        text: "Dodaj",
        onClick: handleAddCategory,
        loading: isSubmittingCategory,
      }}
      secondaryButton={{
        text: "Anuluj",
        onClick: onClose,
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
  );
};
