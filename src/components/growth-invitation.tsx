"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import QuickGrowthCheck from "./quick-growth-check";
export default function GrowthInvitation({
  configured = false,
}: {
  configured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const el = dialog.current;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      el.querySelector<HTMLElement>(".solution-check h3")?.focus(),
    );
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
    };
  }, [open]);
  return (
    <>
      <section
        className="growth-invitation section"
        id="challenge"
        aria-labelledby="growth-invite-title"
      >
        <div className="growth-invite-copy">
          <p className="eyebrow">
            <span /> SMALL CHECK. CLEARER NEXT STEP.
          </p>
          <h2 id="growth-invite-title">
            What’s slowing
            <br />
            <em>your business down?</em>
          </h2>
          <p>
            Tell us about your business, daily challenges and digital presence.
            Complete five guided steps for a readiness score and practical
            ideas. Submit your enquiry at the end so we can help with your next step.
          </p>
          <button
            ref={trigger}
            className="button survey-start"
            onClick={() => setOpen(true)}
          >
            Check my score <ArrowUpRight size={20} />
          </button>
          <span className="growth-invite-note">
            Your business · Your challenge · A clearer next step
          </span>
        </div>
        <div className="growth-invite-art" aria-hidden="true">
          <div className="growth-radar">
            <i />
            <i />
            <i />
            <span>
              YOUR
              <br />
              <b>
                GROWTH
                <br />
                SNAPSHOT
              </b>
            </span>
          </div>
          <span className="radar-tag radar-tag-1">Website</span>
          <span className="radar-tag radar-tag-2">Marketing</span>
          <span className="radar-tag radar-tag-3">Better systems</span>
          <span className="radar-dot" />
        </div>
      </section>
      <dialog
        ref={dialog}
        className="growth-dialog"
        aria-labelledby="growth-dialog-title"
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="growth-dialog-top">
          <span id="growth-dialog-title">YOUR BUSINESS GROWTH CHECK</span>
          <button
            type="button"
            aria-label="Close growth checker"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <QuickGrowthCheck configured={configured} />
      </dialog>
    </>
  );
}
