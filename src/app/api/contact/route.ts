import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  projectType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed" }, { status: 400 });
  }

  const data = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const key = process.env.RESEND_API_KEY;

  if (!key || !to || !from) {
    console.info("[contact] stub accept — set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL");
    return Response.json({ ok: true, mode: "stub" });
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `[Studio Dev] Liên hệ từ ${data.name}`,
    text: [
      `Tên: ${data.name}`,
      `Email: ${data.email}`,
      `Điện thoại: ${data.phone}`,
      `Loại dự án: ${data.projectType}`,
      `Ngân sách: ${data.budget}`,
      `Timeline: ${data.timeline}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] resend", error);
    return Response.json({ error: "Email failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
