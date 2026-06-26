import { CONTACT_EMAIL } from "@/lib/contact";
import {
  ALLOWED_BRIEF_TYPES,
  MAX_BRIEF_BYTES,
  buildInquiryEmailHtml,
  buildInquiryEmailSubject,
  parseInquiryForm,
} from "@/lib/inquiry";
import {
  getClientIp,
  getTurnstileToken,
  isDisposableEmail,
  isHoneypotTriggered,
  isRateLimited,
  isSubmissionTooFast,
  verifyTurnstileToken,
} from "@/lib/spam-protection";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const ip = getClientIp(request);

    if (isHoneypotTriggered(formData) || isSubmissionTooFast(formData)) {
      return NextResponse.json({ success: true });
    }

    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later or email us directly." },
        { status: 429 },
      );
    }

    const turnstileToken = getTurnstileToken(formData);
    const turnstileOk = await verifyTurnstileToken(turnstileToken, ip);

    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Security check failed. Please refresh and try again." },
        { status: 400 },
      );
    }

    const parsed = parseInquiryForm(formData);
    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    if (isDisposableEmail(parsed.email)) {
      return NextResponse.json(
        { error: "Please use a permanent email address so we can reply to you." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const from =
      process.env.RESEND_FROM_EMAIL ?? "WebuildX <onboarding@resend.dev>";
    const to = process.env.INQUIRY_TO_EMAIL ?? CONTACT_EMAIL;

    const brief = formData.get("brief");
    const attachments: { filename: string; content: Buffer }[] = [];

    if (brief instanceof File && brief.size > 0) {
      if (brief.size > MAX_BRIEF_BYTES) {
        return NextResponse.json(
          { error: "Attached file must be 10MB or smaller." },
          { status: 400 },
        );
      }

      if (brief.type && !ALLOWED_BRIEF_TYPES.has(brief.type)) {
        return NextResponse.json(
          { error: "Attached file must be PDF, DOC, DOCX, PPT, or PPTX." },
          { status: 400 },
        );
      }

      attachments.push({
        filename: brief.name,
        content: Buffer.from(await brief.arrayBuffer()),
      });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.email,
      subject: buildInquiryEmailSubject(parsed),
      html: buildInquiryEmailHtml(parsed, {
        receivedAt: new Date(),
        hasAttachment: attachments.length > 0,
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Unable to send your inquiry. Please try again or email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
