import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h2 className="text-6xl font-bold text-base-content mb-4">404</h2>
          <p className="text-xl text-base-content/80 mb-8">
            Przepraszamy, ale strona której szukasz nie istnieje.
          </p>
          <Link href="/" className="btn btn-primary">
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}
