import { z } from "zod";
import { questions } from "@/content/assessment";
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    company: z.string().trim().min(2).max(150),
    email: z.email().max(254),
    phone: z
      .string()
      .trim()
      .min(7)
      .max(30)
      .regex(/^[+\d\s().-]+$/),
    website: z
      .union([
        z.literal(""),
        z
          .url()
          .max(300)
          .refine((v) => /^https?:\/\//.test(v)),
      ])
      .optional(),
    interest: z.string().trim().min(2).max(120),
    message: z.string().trim().min(10).max(3000),
    preferred: z.enum(["Email", "Phone", "WhatsApp"]),
    consent: z.literal(true),
    companyUrl: z.string().max(200).default(""),
    requestId: z.uuid(),
    submittedAt: z.iso.datetime(),
    answers: z
      .record(z.string(), z.array(z.string().max(200)).max(3))
      .optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.answers) {
      const keys = Object.keys(data.answers);
      if (
        keys.length !== questions.length ||
        questions.some(
          (q) =>
            !data.answers?.[q.id]?.length ||
            data.answers[q.id].some((a) => !q.options.includes(a)) ||
            data.answers[q.id].length > (q.multi ? (q.max ?? 3) : 1),
        )
      )
        ctx.addIssue({
          code: "custom",
          path: ["answers"],
          message:
            "Complete the current 12-question assessment before sending its summary.",
        });
    }
  });
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
export function emailConfigured() {
  return !!(
    process.env.RESEND_API_KEY &&
    process.env.WEXORAA_LEAD_EMAIL &&
    process.env.WEXORAA_FROM_EMAIL
  );
}
