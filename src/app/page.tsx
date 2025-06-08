import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-base-content mb-8">
          Witaj w BillBox
        </h1>
        <p className="text-xl text-base-content/80 mb-8">
          Zarządzaj swoimi rachunkami i budżetem w jednym miejscu. Proste,
          bezpieczne i intuicyjne.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login" className="btn btn-primary">
            Zaloguj się
          </Link>
          <Link href="/auth/register" className="btn btn-outline btn-primary">
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
}
