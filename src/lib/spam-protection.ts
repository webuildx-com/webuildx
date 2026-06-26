import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getStringField } from "@/lib/inquiry";

const MIN_SUBMIT_MS = 3_000;
const MAX_SUBMIT_MS = 2 * 60 * 60 * 1000;

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "dispostable.com",
  "dropmail.me",
  "fakeinbox.com",
  "getairmail.com",
  "getnada.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "maildrop.cc",
  "mailinator.com",
  "mailnesia.com",
  "mailnull.com",
  "mintemail.com",
  "moakt.com",
  "mytemp.email",
  "sharklasers.com",
  "spam4.me",
  "temp-mail.org",
  "tempail.com",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "tempm.com",
  "tmpmail.net",
  "tmpmail.org",
  "trashmail.com",
  "trashmail.net",
  "yopmail.com",
]);

let inquiryRateLimit: Ratelimit | null = null;

function getInquiryRateLimit(): Ratelimit | null {
  if (inquiryRateLimit) return inquiryRateLimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  inquiryRateLimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "webuildx:inquiry",
  });

  return inquiryRateLimit;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isHoneypotTriggered(formData: FormData): boolean {
  const value = formData.get("_honeypot");
  return typeof value === "string" && value.trim().length > 0;
}

export function isSubmissionTooFast(formData: FormData): boolean {
  const raw = getStringField(formData, "_startedAt");
  const startedAt = Number(raw);

  if (!raw || !Number.isFinite(startedAt)) {
    return true;
  }

  const elapsed = Date.now() - startedAt;
  return elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_MS;
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

export async function verifyTurnstileToken(
  token: string,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return process.env.NODE_ENV === "development";
  }

  if (!token) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          remoteip: ip,
        }),
      },
    );

    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function isRateLimited(ip: string): Promise<boolean> {
  const limiter = getInquiryRateLimit();
  if (!limiter) return false;

  const { success } = await limiter.limit(ip);
  return !success;
}

export function getTurnstileToken(formData: FormData): string {
  return getStringField(formData, "cf-turnstile-response");
}
