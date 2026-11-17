"use client";
import { useRef, useState } from "react";
import { saveLead, type LeadPayload } from "@/lib/lead-master";
export function useLeadSubmission() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const request = useRef({ fingerprint: "", id: "" });
  const pending = useRef(false);
  async function submit(payload: LeadPayload) {
    if (pending.current) return false;
    const fingerprint = JSON.stringify(payload);
    if (request.current.fingerprint !== fingerprint)
      request.current = { fingerprint, id: crypto.randomUUID() };
    pending.current = true;
    setState("loading");
    setError("");
    try {
      await saveLead(payload, request.current.id);
      setState("success");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
      setState("error");
      return false;
    } finally {
      pending.current = false;
    }
  }
  return { state, error, submit };
}
