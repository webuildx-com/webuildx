export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;

  const cleaned = params
    ? Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined),
      )
    : undefined;

  window.gtag("event", name, cleaned);
}

/** GA4 recommended event for form leads — mark as conversion in GA4 admin */
export function trackGenerateLead(method: string, params?: Record<string, string>) {
  trackEvent("generate_lead", { method, ...params });
}

export const HOME_SECTIONS = [
  "hero",
  "impact",
  "work",
  "services",
  "how-we-work",
  "testimonials",
  "contact",
] as const;

export const INQUIRY_SECTIONS = ["inquiry-form", "faq"] as const;
