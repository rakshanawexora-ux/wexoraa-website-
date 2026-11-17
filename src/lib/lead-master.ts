export const leadMasterUrl =
  "https://script.google.com/macros/s/AKfycbygoEEdr_nZjIOT5RRDDl_cY2-CJc262nASU41o6iW2esfPXqWj0MJ5Vasy9crCbRMSpg/exec";
export type LeadPayload = {
  name: string;
  company: string;
  role?: string;
  phone: string;
  email: string;
  preferred: string;
  source: string;
  interest: string;
  businessType?: string;
  businessAge?: string;
  problem?: string;
  message?: string;
  score: number | null;
  recommendations?: string[];
  answers?: Record<string, unknown>;
  consent: boolean;
  companyUrl: string;
};
export function leadEndpoint() {
  const value = (
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ?? leadMasterUrl
  ).trim();
  try {
    const u = new URL(value);
    if (
      u.origin === "https://script.google.com" &&
      /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(u.pathname) &&
      !u.search &&
      !u.hash
    )
      return u.toString();
  } catch {
    /* Invalid configuration must not send personal data elsewhere. */
  }
  return undefined;
}
export async function saveLead(payload: LeadPayload, requestId: string) {
  const endpoint = leadEndpoint();
  if (!endpoint)
    throw new Error(
      "Enquiry storage is not connected yet. Please try again later.",
    );
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      credentials: "omit",
      redirect: "follow",
      body: new URLSearchParams({
        payload: JSON.stringify({ ...payload, requestId }),
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    throw new Error(
      "We could not confirm that your enquiry was saved. Your details are still here; please retry.",
    );
  }
  let result: { accepted?: boolean; requestId?: string; error?: string };
  try {
    result = await response.json();
  } catch {
    throw new Error(
      "We could not confirm the save. Please retry; repeated attempts use the same enquiry ID.",
    );
  }
  if (
    !response.ok ||
    result.accepted !== true ||
    result.requestId !== requestId
  )
    throw new Error(
      result.error ||
        "We could not confirm that your enquiry was saved. Please retry.",
    );
  return result;
}
