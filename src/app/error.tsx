"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Ups! Coś poszło nie tak
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub skontaktuj się
        z pomocą techniczną.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
