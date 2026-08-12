"use client";

import { useState } from "react";

export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable over plain http on some browsers; the text
      // stays selectable, so failing quietly is better than an alert here.
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md border border-yellow/30 bg-yellow/10 px-2.5 py-1 text-[11px] font-bold text-yellow transition-colors hover:bg-yellow/20"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto px-4 py-4 text-[12.5px] leading-relaxed whitespace-pre-wrap text-white/70">
        {text}
      </pre>
    </div>
  );
}
