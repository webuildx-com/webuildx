import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Link from "next/link";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sea-salt">
      <Header alwaysVisible />
      <main className="pt-[72px]">
        <article className="mx-auto max-w-[720px] px-6 py-14 lg:px-10 lg:py-20">
          <Link
            href="/"
            className="text-[13px] text-subtle transition-colors hover:text-ink"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight text-ink">
            {title}
          </h1>
          <div className="prose-legal mt-10 space-y-6 text-[15px] leading-relaxed text-ink/80">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
