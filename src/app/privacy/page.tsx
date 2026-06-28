import { LegalPage } from "@/components/legal-page";
import { CONTACT_EMAIL } from "@/lib/contact";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — WebuildX",
  description: "How WebuildX collects, uses, and protects your personal information",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        <strong>WebuildX Software Technology Limited</strong> (&quot;WebuildX&quot;,
        &quot;we&quot;, &quot;us&quot;) operates webuildx.com — this policy explains
        how we handle personal information when you visit our website or contact us
      </p>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Information we collect</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Inquiry form:</strong> name, email, company, website, project
            details, and any file you choose to upload when you submit our contact
            form
          </li>
          <li>
            <strong>Analytics:</strong> anonymised usage data such as pages viewed,
            scroll behaviour, and button clicks via Google Analytics 4 and Microsoft
            Clarity — see our{" "}
            <Link href="/cookies" className="text-brand hover:underline">
              Cookie Policy
            </Link>
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type, and device
            information collected automatically by our hosting and security providers
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">How we use it</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>To respond to project inquiries and communicate with you</li>
          <li>To understand how visitors use our site and improve our content</li>
          <li>To protect our website from spam and abuse</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Sharing</h2>
        <p>
          We do not sell your personal data — we share information only with service
          providers that help us operate the site (for example email delivery, analytics,
          hosting) and only as needed to provide those services
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Retention</h2>
        <p>
          Inquiry submissions are kept as long as needed to respond to you and manage
          our business relationship — analytics data is retained according to each
          provider&apos;s default settings
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          information by contacting us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[17px] font-semibold text-ink">Changes</h2>
        <p>
          We may update this policy from time to time — the latest version will always
          be published on this page
        </p>
        <p className="text-[13px] text-subtle">Last updated: June 2026</p>
      </section>
    </LegalPage>
  );
}
