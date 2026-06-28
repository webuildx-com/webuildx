export const PROJECT_TYPES = [
  "Software Development (Web/Mobile App)",
  "Cloud Infrastructure Services (Migration, DevOps, Security, and more)",
  "Team Formation & Culture Development",
  "Custom Engineering Solution",
  "Not Sure Yet",
] as const;

export const PROJECT_STAGES = [
  "Idea / concept",
  "Early validation",
  "Ready to build",
  "In progress",
  "Live product",
] as const;

export const BUDGET_RANGES = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
] as const;

export const TIMELINES = [
  "ASAP",
  "1–2 months",
  "3–4 months",
  "5–6 months",
  "Flexible",
] as const;

export const MAX_BRIEF_BYTES = 10 * 1024 * 1024;

export const ALLOWED_BRIEF_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

export type InquiryPayload = {
  name: string;
  email: string;
  company: string;
  website: string;
  projectType: string;
  stage: string;
  budget: string;
  timeline: string;
  description: string;
};

export function getStringField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseInquiryForm(formData: FormData): InquiryPayload | { error: string } {
  const name = getStringField(formData, "name");
  const email = getStringField(formData, "email");
  const company = getStringField(formData, "company");
  const website = getStringField(formData, "website");
  const projectType = getStringField(formData, "projectType");
  const stage = getStringField(formData, "stage");
  const budget = getStringField(formData, "budget");
  const timeline = getStringField(formData, "timeline");
  const description = getStringField(formData, "description");

  if (!name || name.length > 120) {
    return { error: "Please enter your name" };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address" };
  }

  if (website && !/^https?:\/\/.+/i.test(website)) {
    return { error: "Please enter a valid website URL" };
  }

  if (!PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])) {
    return { error: "Please select what you are looking for" };
  }

  if (!PROJECT_STAGES.includes(stage as (typeof PROJECT_STAGES)[number])) {
    return { error: "Please select a project stage" };
  }

  if (!BUDGET_RANGES.includes(budget as (typeof BUDGET_RANGES)[number])) {
    return { error: "Please select a budget range" };
  }

  if (!TIMELINES.includes(timeline as (typeof TIMELINES)[number])) {
    return { error: "Please select a timeline" };
  }

  if (!description || description.length > 1000) {
    return { error: "Please tell us about the project (max 1000 characters)" };
  }

  return {
    name,
    email,
    company,
    website,
    projectType,
    stage,
    budget,
    timeline,
    description,
  };
}

export function buildInquiryEmailSubject(payload: InquiryPayload): string {
  const service = payload.projectType.split("(")[0]?.trim() ?? payload.projectType;
  return `[WebuildX] New contact: ${payload.name} — ${service}`;
}

export function buildInquiryEmailHtml(
  payload: InquiryPayload,
  options?: { receivedAt?: Date; hasAttachment?: boolean },
): string {
  const receivedAt = options?.receivedAt ?? new Date();
  const formattedDate = receivedAt.toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  });

  const fields = [
    { label: "Email", value: payload.email, href: `mailto:${payload.email}` },
    { label: "Company", value: payload.company || "—" },
    ...(payload.website
      ? [{ label: "Website", value: payload.website, href: payload.website }]
      : []),
    { label: "Looking for", value: payload.projectType },
    { label: "Project stage", value: payload.stage },
    { label: "Budget range", value: payload.budget },
    { label: "Timeline", value: payload.timeline },
    ...(options?.hasAttachment
      ? [{ label: "Brief attached", value: "Yes — see attachment" }]
      : []),
  ];

  const fieldRows = fields
    .map((field) => {
      const valueCell = field.href
        ? `<a href="${escapeHtml(field.href)}" style="color:#0b1e1c;text-decoration:underline;">${escapeHtml(field.value)}</a>`
        : escapeHtml(field.value);

      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e8ebea;width:140px;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#7a8684;vertical-align:top;">
            ${field.label}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8ebea;font-size:14px;color:#0b1e1c;vertical-align:top;">
            ${valueCell}
          </td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New contact — ${escapeHtml(payload.name)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f4f4;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e8ebea;">
            <tr>
              <td style="background-color:#ed1b24;padding:18px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 8px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;">
                        New contact
                      </p>
                      <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:22px;font-weight:700;line-height:1.2;color:#ffffff;">
                        ${escapeHtml(payload.name)}
                      </p>
                    </td>
                    <td align="right" valign="top">
                      <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">
                        Webuild<span style="color:#ffffff;">X</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 0;font-family:Inter,Arial,sans-serif;">
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#4f5c5a;">
                  A new project inquiry was submitted via
                  <strong style="color:#0b1e1c;">webuildx.com/start-a-project</strong>
                  on ${escapeHtml(formattedDate)} (WAT)
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius:2px;background-color:#0b1e1c;">
                      <a href="mailto:${escapeHtml(payload.email)}?subject=${escapeHtml(`Re: Your inquiry to WebuildX`)}" style="display:inline-block;padding:12px 18px;font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Reply to ${escapeHtml(payload.name.split(" ")[0] ?? payload.name)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8ebea;border-collapse:collapse;">
                  ${fieldRows}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px 24px;">
                <p style="margin:0 0 10px;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7a8684;">
                  Project details
                </p>
                <div style="padding:16px;background-color:#f9f9f9;border:1px solid #e8ebea;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.7;color:#0b1e1c;white-space:pre-wrap;">
${escapeHtml(payload.description)}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px;background-color:#f9f9f9;border-top:1px solid #e8ebea;">
                <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:12px;line-height:1.6;color:#7a8684;">
                  WebuildX project inquiry · Reply directly to reach ${escapeHtml(payload.email)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
