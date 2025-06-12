export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export const validateFileSize = (value: unknown) => {
  if (!value) return true;
  if (!(value instanceof FileList)) return false;
  if (!value.length) return true;

  const file = value[0];
  return file.size <= MAX_FILE_SIZE;
};

export const validateFileType = (value: unknown) => {
  if (!value) return true;
  if (!(value instanceof FileList)) return false;
  if (!value.length) return true;

  const file = value[0];
  return ALLOWED_IMAGE_TYPES.includes(
    file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
  );
};
