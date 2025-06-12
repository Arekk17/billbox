import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";

interface CategoryFormProps {
  onSubmit: (data: { name: string; color: string }) => Promise<void>;
  initialName?: string;
  initialColor?: string;
  submitButtonText?: string;
  isSubmitting?: boolean;
}

export const CategoryForm = ({
  onSubmit,
  initialName = "",
  initialColor = "#000000",
  submitButtonText = "Zapisz",
  isSubmitting = false,
}: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState(initialName);
  const [categoryColor, setCategoryColor] = useState(initialColor);

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error("Nazwa kategorii jest wymagana");
      return;
    }

    try {
      await onSubmit({
        name: categoryName.trim(),
        color: categoryColor,
      });
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Wystąpił błąd podczas zapisywania kategorii");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
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
            style={{ backgroundColor: categoryColor }}
          />
          <input
            type="text"
            value={categoryColor}
            onChange={(e) => setCategoryColor(e.target.value)}
            className="input input-bordered flex-1"
            placeholder="#000000"
          />
        </div>
        <div className="mt-2">
          <HexColorPicker color={categoryColor} onChange={setCategoryColor} />
        </div>
      </div>
      <button
        className="btn btn-primary w-full"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Zapisywanie..." : submitButtonText}
      </button>
    </div>
  );
};
