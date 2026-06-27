import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL } from "@/lib/contact";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — WebuildX",
  description: "How WebuildX uses cookies and similar technologies on webuildx.com.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>
        This policy explains how <strong>WebuildX Software Technology Limited</strong>{" "}
        uses cookies and similar technologies on webuildx.com.
      </p>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website.
          We also use similar technologies such as local storage and analytics scripts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Cookies we use</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-[14px]">
            <thead className="border-b border-border bg-white/60">
              <tr>
                <th className="px-4 py-3 font-medium text-ink">Service</th>
                <th className="px-4 py-3 font-medium text-ink">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              <tr>
                <td className="px-4 py-3 align-top">Google Analytics 4</td>
                <td className="px-4 py-3 text-ink/70">
                  Measures traffic, page views, and interactions to help us understand
                  how the site is used.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Microsoft Clarity</td>
                <td className="px-4 py-3 text-ink/70">
                  Provides heatmaps and session recordings to improve usability.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Cloudflare Turnstile</td>
                <td className="px-4 py-3 text-ink/70">
                  Security check on our inquiry form to prevent spam submissions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Managing cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. Blocking
          analytics cookies will not affect your ability to browse the site, but some
          features (such as form spam protection) may rely on cookies to function
          correctly.
        </p>
        <p>
          To opt out of Google Analytics across all sites, visit{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Google&apos;s opt-out page
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">More information</h2>
        <p>
          For details on how we handle personal data, see our{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          . Questions? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p className="text-[13px] text-subtle">Last updated: June 2026</p>
      </section>
    </LegalPage>
  );
}
