import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-md text-sm text-muted">
        The page you are looking for does not exist
      </p>
      <Link
        href="/"
        className="bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
      >
        Back home
      </Link>
    </div>
  );
}
