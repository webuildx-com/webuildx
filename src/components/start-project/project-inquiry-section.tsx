"use client";

import { ArrowRightIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  CONTACT_EMAIL,
  OFFICE_ADDRESS,
  OFFICE_MAPS_URL,
} from "@/lib/contact";
import {
  BUDGET_RANGES,
  PROJECT_STAGES,
  PROJECT_TYPES,
  TIMELINES,
} from "@/lib/inquiry";
import {
  InquiryTurnstile,
  isTurnstileConfigured,
} from "@/components/start-project/inquiry-turnstile";
import { trackEvent, trackGenerateLead } from "@/lib/analytics";
import { useId, useRef, useState } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const nextSteps = [
  {
    title: "We review your brief",
    description:
      "We read through your submission and assess fit, scope, and the smartest next step.",
  },
  {
    title: "We schedule a call",
    description:
      "If it looks like a good match, we'll set up a short discovery call to go deeper.",
  },
  {
    title: "We shape the right next step",
    description:
      "You'll get a clear recommendation — whether that's a sprint, a proposal, or a referral.",
  },
];

const cardClassName =
  "overflow-hidden rounded-lg border border-border bg-white shadow-[0_1px_2px_rgba(11,30,28,0.04)]";

const inputClassName =
  "w-full rounded-sm border border-border bg-white px-4 py-3 text-[14px] text-ink placeholder:text-subtle/70 outline-none transition-colors focus:border-ink/30";

const labelClassName = "mb-2 block text-[13px] font-medium text-ink";

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClassName}>
      {children}
      {required && (
        <span className="text-brand" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function SelectField({
  id,
  name,
  label,
  options,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          required={required}
          className={`${inputClassName} appearance-none pr-10`}
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function ProjectInquirySection() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [formStartedAt] = useState(() => Date.now().toString());
  const inquiryStartedRef = useRef(false);
  const turnstileEnabled = isTurnstileConfigured();

  const markInquiryStarted = () => {
    if (inquiryStartedRef.current) return;
    inquiryStartedRef.current = true;
    trackEvent("inquiry_started", { page: "/start-a-project" });
  };

  const resetTurnstile = () => {
    setTurnstileToken("");
    setTurnstileKey((key) => key + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the security check below.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (turnstileToken) {
      formData.set("cf-turnstile-response", turnstileToken);
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        resetTurnstile();
        trackEvent("inquiry_error", {
          reason: data.error?.slice(0, 120) ?? "unknown",
        });
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      trackGenerateLead("inquiry_form", {
        project_type: formData.get("projectType")?.toString() ?? "",
      });
      trackEvent("inquiry_submitted", {
        project_type: formData.get("projectType")?.toString() ?? "",
      });

      setStatus("success");
      formRef.current?.reset();
      setDescription("");
      setFileName(null);
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <section
        id="inquiry-form"
        className="bg-sea-salt pb-16 lg:pb-20"
        aria-labelledby="inquiry-success-heading"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className={`${cardClassName} px-6 py-14 sm:px-10 sm:py-16`}>
            <div className="mx-auto max-w-lg text-center">
              <h2
                id="inquiry-success-heading"
                className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-ink"
              >
                Thanks — we&apos;ve got your inquiry
                <span className="text-brand">.</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                We&apos;ll review your submission and reply within 24 hours
                with a clear next step.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 inline-flex items-center gap-2 border border-border px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink/20"
              >
                Send another inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="inquiry-form"
      className="bg-sea-salt pb-16 lg:pb-20"
      aria-labelledby="project-details-heading"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <ScrollReveal>
          <div className={cardClassName}>
            <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
              <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <h2
                  id="project-details-heading"
                  className="mb-8 text-[18px] font-semibold text-ink"
                >
                  Project details
                </h2>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onFocusCapture={markInquiryStarted}
                  className="space-y-8"
                >
                  <input
                    type="hidden"
                    name="_startedAt"
                    value={formStartedAt}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <input
                      type="text"
                      name="_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === "error" && errorMessage && (
                    <p
                      role="alert"
                      className="border border-brand/20 bg-brand/5 px-4 py-3 text-[14px] text-ink"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor={`${formId}-name`} required>
                        Name
                      </FieldLabel>
                      <input
                        id={`${formId}-name`}
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${formId}-email`} required>
                        Email
                      </FieldLabel>
                      <input
                        id={`${formId}-email`}
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${formId}-company`}>
                        Company <span className="font-normal text-subtle">(optional)</span>
                      </FieldLabel>
                      <input
                        id={`${formId}-company`}
                        name="company"
                        type="text"
                        placeholder="Your company name"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor={`${formId}-website`}>
                        Website <span className="font-normal text-subtle">(optional)</span>
                      </FieldLabel>
                      <input
                        id={`${formId}-website`}
                        name="website"
                        type="url"
                        placeholder="https://yourcompany.com"
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <SelectField
                    id={`${formId}-project-type`}
                    name="projectType"
                    label="What are you looking for?"
                    options={PROJECT_TYPES}
                    required
                  />

                  <div className="grid gap-5 sm:grid-cols-3">
                    <SelectField
                      id={`${formId}-stage`}
                      name="stage"
                      label="Project stage"
                      options={PROJECT_STAGES}
                      required
                    />
                    <SelectField
                      id={`${formId}-budget`}
                      name="budget"
                      label="Budget range"
                      options={BUDGET_RANGES}
                      required
                    />
                    <SelectField
                      id={`${formId}-timeline`}
                      name="timeline"
                      label="Timeline"
                      options={TIMELINES}
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel htmlFor={`${formId}-description`} required>
                      Tell us about the project
                    </FieldLabel>
                    <div className="relative">
                      <textarea
                        id={`${formId}-description`}
                        name="description"
                        rows={5}
                        maxLength={1000}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        data-lenis-prevent
                        placeholder="Share a few details about your idea, goals, users, and any context that helps us understand."
                        className={`${inputClassName} resize-none pb-8`}
                      />
                      <span className="pointer-events-none absolute bottom-3 right-4 text-[12px] text-subtle">
                        {description.length} / 1000
                      </span>
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor={`${formId}-brief`}>
                      Attach brief{" "}
                      <span className="font-normal text-subtle">(optional)</span>
                    </FieldLabel>
                    <input
                      ref={fileInputRef}
                      id={`${formId}-brief`}
                      name="brief"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      className="sr-only"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                    />
                    <div className="flex flex-col gap-2 border border-border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3 text-[13px] text-muted">
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
                          <path
                            d="M10.5 3.5 16 9v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 15.5V5.5A1.5 1.5 0 0 1 5.5 4H10"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinejoin="round"
                          />
                          <path d="M10 3.5V9h5.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                        </svg>
                        <span>
                          {fileName ? (
                            <span className="text-[13px] text-ink">{fileName}</span>
                          ) : (
                            <span className="text-subtle">No file chosen</span>
                          )}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand transition-colors hover:text-brand-hover"
                      >
                        Choose file
                        <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" />
                      </button>
                    </div>
                    <p className="mt-2 text-[12px] text-subtle">
                      Attach files up to 10MB (PDF, DOCX, PPTX)
                    </p>
                  </div>

                  {turnstileEnabled && (
                    <InquiryTurnstile
                      resetKey={turnstileKey}
                      onTokenChange={setTurnstileToken}
                    />
                  )}

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-2 bg-brand px-8 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? "Sending..." : "Send inquiry"}
                      <ArrowRightIcon className="h-4 w-4 shrink-0" />
                    </button>
                    <p className="text-[13px] text-muted">
                      Or email{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-medium text-brand underline underline-offset-2 transition-colors hover:text-brand-hover"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  </div>
                </form>
              </div>

              <aside className="bg-sea-salt/60 p-6 sm:p-8 lg:p-10">
                <div className="space-y-10">
                  <div>
                    <h3 className="mb-6 text-[15px] font-semibold text-ink">
                      What happens next
                    </h3>
                    <ol className="space-y-0">
                      {nextSteps.map((step, index) => (
                        <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                          <div className="relative flex w-2 shrink-0 flex-col items-center pt-1.5">
                            <span
                              className="z-10 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                              aria-hidden
                            />
                            {index < nextSteps.length - 1 && (
                              <span
                                className="absolute top-2 h-[calc(100%+12px)] w-px bg-border"
                                aria-hidden
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-ink">{step.title}</p>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                              {step.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="border-t border-border pt-10">
                    <h3 className="mb-5 text-[15px] font-semibold text-ink">
                      Get in touch
                    </h3>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="inline-flex items-center gap-3 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-subtle" aria-hidden>
                            <path d="M3.5 6.5 10 11l6.5-4.5M4.5 15.5h11a1.5 1.5 0 0 0 1.5-1.5V6.5a1.5 1.5 0 0 0-1.5-1.5h-11A1.5 1.5 0 0 0 3 6.5v7.5a1.5 1.5 0 0 0 1.5 1.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                          </svg>
                          {CONTACT_EMAIL}
                        </a>
                      </li>
                      <li>
                        <a
                          href={OFFICE_MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex gap-3 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-subtle" aria-hidden>
                            <path d="M10 17s5.5-4 5.5-8.5a5.5 5.5 0 1 0-11 0C4.5 13 10 17 10 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                            <circle cx="10" cy="8.5" r="1.75" stroke="currentColor" strokeWidth="1.25" />
                          </svg>
                          <span>
                            {OFFICE_ADDRESS}
                            <span className="mt-1 block text-[12px] text-brand">
                              View on Google Maps →
                            </span>
                          </span>
                        </a>
                      </li>
                      <li className="inline-flex items-center gap-3 text-[13px] text-muted">
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-subtle" aria-hidden>
                          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.25" />
                          <path d="M10 7v3.5l2 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                        </svg>
                        We reply within 24 hours
                      </li>
                    </ul>
                  </div>

                  <p className="border-t border-border pt-8 text-[12px] leading-relaxed text-subtle">
                    Small senior teams. Clear process. Serious execution.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
