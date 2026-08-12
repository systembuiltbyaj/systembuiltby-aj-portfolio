"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { unlock } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-yellow py-3.5 text-sm font-bold text-black transition hover:bg-yellow-dark active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? "Unlocking..." : "Unlock"}
    </button>
  );
}

export function PlaybookGate() {
  const [state, formAction] = useActionState(unlock, null as { error?: string } | null);

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-100px] left-1/2 h-[600px] w-[900px] -translate-x-1/2
          bg-[radial-gradient(ellipse_at_50%_30%,rgba(94,23,235,0.18)_0%,transparent_65%)]"
      />

      <div
        className="relative w-full max-w-[420px] rounded-2xl border border-white/[0.10] bg-white/[0.04] px-7 py-11 text-center
          backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-10"
      >
        <span className="mb-5 block text-4xl">🔒</span>

        <h1 className="mb-2 text-2xl font-black text-white">Private</h1>
        <p className="mb-7 text-sm leading-relaxed text-white/55">
          These are my own working notes. Enter the passcode to open them.
        </p>

        <form action={formAction} className="space-y-3">
          <input
            type="password"
            name="passcode"
            autoComplete="current-password"
            placeholder="Passcode"
            aria-label="Passcode"
            className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-center text-sm text-white
              placeholder:text-white/30 focus:border-persian focus:outline-none"
          />
          <SubmitButton />
        </form>

        {state?.error && (
          <p role="alert" className="mt-4 text-[13px] text-red-400">
            {state.error}
          </p>
        )}

        <a
          href="/tools"
          className="mt-7 inline-block text-xs text-white/35 transition-colors hover:text-white/60"
        >
          &larr; Back to Tools
        </a>
      </div>
    </div>
  );
}
