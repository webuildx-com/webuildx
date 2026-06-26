"use client";

import { Turnstile } from "@marsidev/react-turnstile";

type InquiryTurnstileProps = {
  onTokenChange: (token: string) => void;
  resetKey: number;
};

export function InquiryTurnstile({
  onTokenChange,
  resetKey,
}: InquiryTurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  return (
    <Turnstile
      key={resetKey}
      siteKey={siteKey}
      onSuccess={onTokenChange}
      onExpire={() => onTokenChange("")}
      onError={() => onTokenChange("")}
      options={{ theme: "light", size: "normal" }}
    />
  );
}

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
