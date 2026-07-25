"use client";

import { FormEvent, useState } from "react";
import { identity } from "@/lib/content/identity";

const WEB3FORMS_ACCESS_KEY = "1bc58e4f-d9d4-4bf4-99b1-479dab2db81b";

function ThanksPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="reveal flex flex-col items-center py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-focus/15 text-accent-link">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-text-body">Thank you!</h2>
      <p className="max-w-sm text-text-muted">
        Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-md border border-border bg-white/[0.04] px-4 py-2 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
      >
        Send another message
      </button>
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <p className="mb-2 font-mono text-[13px] text-text-muted">{"// contact.tsx"}</p>
      <h1 className="text-3xl font-semibold text-text-body">Let&apos;s get in touch</h1>

      {status === "sent" ? (
        <ThanksPanel onReset={() => setStatus("idle")} />
      ) : (
        <>
          <p className="mt-3 text-text-muted">
            Have an idea or a project in mind? Reach out via email, or submit this form and I&apos;ll get back to you.
          </p>

          <div className="mt-6 space-y-1 text-[13px]">
            <p>
              Email:{" "}
              <a href={`mailto:${identity.email}`} className="text-accent-link hover:underline">
                {identity.email}
              </a>
            </p>
            <p>Tel: {identity.phone}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="rounded-md border border-border bg-white/[0.03] px-3 py-2.5 text-[14px] text-text-body outline-none transition-colors focus:border-accent-focus"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="rounded-md border border-border bg-white/[0.03] px-3 py-2.5 text-[14px] text-text-body outline-none transition-colors focus:border-accent-focus"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={6}
              className="w-full rounded-md border border-border bg-white/[0.03] px-3 py-2.5 text-[14px] text-text-body outline-none transition-colors focus:border-accent-focus"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-md bg-accent-focus px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            {status === "error" && (
              <p className="text-[13px] text-diag-error">
                Something went wrong — please email me directly at {identity.email}.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
