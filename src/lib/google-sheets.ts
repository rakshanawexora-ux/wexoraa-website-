// Public Google Apps Script Web App URL, not a secret or a Google Form URL.
export function sheetsEndpoint() {
  const value = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.origin === "https://script.google.com" &&
      /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url.pathname) &&
      !url.search &&
      !url.hash
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}
