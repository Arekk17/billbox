import { validateFileSize } from "@/constants/file";
import { validateFileType } from "@/constants/file";
import { cn } from "@/lib/utils/cn";
import { FileInputProps, FileInputValue } from "@/lib/types/recips";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export const FileInput = <T extends Record<string, unknown>>({
  name,
  register,
  errors,
  required = false,
  className = "",
  label = "Wybierz obraz",
  maxSize = 2,
  validation,
}: FileInputProps<T>) => {
  const error = errors?.[name]?.message as string;

  return (
    <div className="form-control w-full">
      <fieldset className={cn("fieldset", className)}>
        <label className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
        <input
          type="file"
          className={cn(
            "file-input file-input-bordered w-full",
            error ? "file-input-error" : ""
          )}
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          {...register(name, {
            required: required ? "To pole jest wymagane" : false,
            validate: {
              maxSize: (value: unknown) => {
                if (!validateFileSize(value as FileInputValue)) {
                  return `Plik nie może być większy niż ${maxSize}MB`;
                }
                return true;
              },
              fileType: (value: unknown) => {
                if (!validateFileType(value as FileInputValue)) {
                  return "Nieprawidłowy format pliku. Dozwolone formaty: JPG, PNG, GIF, WEBP";
                }
                return true;
              },
              ...(validation?.validate || {}),
            },
          })}
        />
        <label className="label">
          <span className="label-text-alt">
            Maksymalny rozmiar: {maxSize}MB. Dozwolone formaty: JPG, PNG, GIF,
            WEBP
          </span>
        </label>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </fieldset>
    </div>
  );
};
