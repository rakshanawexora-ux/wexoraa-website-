"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import EnquiryForm from "./enquiry-form";
type Request = { interest: string; serial: number };
const PopupContext = createContext<((interest: string) => void) | null>(null);
export function EnquiryProvider({
  children,
  configured,
}: {
  children: React.ReactNode;
  configured: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const sequence = useRef(0);
  const [request, setRequest] = useState<Request | null>(null);
  function open(interest: string) {
    trigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setRequest({
      interest: interest.slice(0, 120),
      serial: ++sequence.current,
    });
  }
  useEffect(() => {
    if (!request || !dialog.current) return;
    const el = dialog.current;
    if (!el.open) el.showModal();
    requestAnimationFrame(() =>
      el.querySelector<HTMLInputElement>('input[name="name"]')?.focus(),
    );
  }, [request]);
  return (
    <PopupContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="enquiry-dialog"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        onClose={() => trigger.current?.isConnected && trigger.current.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="popup-inner">
          <button
            type="button"
            className="popup-close"
            aria-label="Close enquiry"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
          <span className="popup-kicker">LET’S START A CONVERSATION</span>
          <h2 id="popup-title">What do you have in mind?</h2>
          <p id="popup-description">
            A few details are enough. We’ll use them to respond to your
            requirement.
          </p>
          {request && (
            <>
              <span className="popup-interest">{request.interest}</span>
              <EnquiryForm
                key={request.serial}
                configured={configured}
                compact
                interest={request.interest}
              />
            </>
          )}
        </div>
      </dialog>
    </PopupContext.Provider>
  );
}
export function EnquiryCTA({
  interest = "Project enquiry",
  children,
  className = "button",
  label,
}: {
  interest?: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const open = useContext(PopupContext);
  return (
    <Link
      href={`/contact?interest=${encodeURIComponent(interest)}`}
      className={className}
      aria-haspopup="dialog"
      aria-label={label}
      onClick={(e) => {
        if (!open || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        open(interest);
      }}
    >
      {children}
    </Link>
  );
}
