import { useState } from "react";
import { Modal } from "@/components/molecules/Modal/Modal";
import { toast } from "react-toastify";
import { addCategory, updateCategory } from "@/lib/services/category.service";
import { CategoryForm } from "@/components/organisms/Form/CategoryForm";
import { Category } from "@/lib/validations/category";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  mode: "add" | "edit";
  category?: Category;
  onSuccess?: () => void;
}

export const CategoryModal = ({
  isOpen,
  onClose,
  userId,
  mode,
  category,
  onSuccess,
}: CategoryModalProps) => {
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  const handleSubmit = async (data: { name: string; color: string }) => {
    setIsSubmittingCategory(true);
    try {
      let result;

      if (mode === "add") {
        result = await addCategory({
          name: data.name,
          userId,
          color: data.color,
        });
      } else {
        if (!category?.id) {
          throw new Error("Brak ID kategorii do edycji");
        }
        result = await updateCategory(category.id, {
          name: data.name,
          color: data.color,
        });
      }

      if (result.success && result.data) {
        toast.success(
          mode === "add"
            ? "Kategoria dodana pomyślnie"
            : "Kategoria zaktualizowana pomyślnie"
        );
        onClose();
        onSuccess?.();
      } else {
        toast.error(
          result.error ||
            `Wystąpił błąd podczas ${
              mode === "add" ? "dodawania" : "aktualizacji"
            } kategorii`
        );
      }
    } catch (error) {
      console.error(
        `Error ${mode === "add" ? "adding" : "updating"} category:`,
        error
      );
      toast.error(
        `Wystąpił błąd podczas ${
          mode === "add" ? "dodawania" : "aktualizacji"
        } kategorii`
      );
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Dodaj nową kategorię" : "Edytuj kategorię"}
      primaryButton={{
        text: "Anuluj",
        onClick: onClose,
      }}
    >
      <CategoryForm
        onSubmit={handleSubmit}
        submitButtonText={mode === "add" ? "Dodaj kategorię" : "Zapisz zmiany"}
        isSubmitting={isSubmittingCategory}
        initialName={category?.name}
        initialColor={category?.color || "#000000"}
      />
    </Modal>
  );
};
