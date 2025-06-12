"use client";

import { useEffect } from "react";
import { Card } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";

export default function ReportError({
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
    <Card>
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Wystąpił błąd</h2>
        <p className="text-base-content/70 mb-6">
          Przepraszamy, nie udało się załadować raportu. Spróbuj ponownie
          później.
        </p>
        <Button onClick={reset}>Spróbuj ponownie</Button>
      </div>
    </Card>
  );
}
