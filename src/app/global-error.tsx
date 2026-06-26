"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-xl font-semibold text-ink">Something went wrong</h1>
          <p className="max-w-md text-sm text-muted">
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
