"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aj-playbook-call-checklist";

// Items arrive as a prop from the server component on purpose: nothing from
// the playbook itself should end up in a client bundle.
export function CallChecklist({ items }: { items: string[] }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));

  // Read after mount, never during render: touching localStorage while
  // rendering breaks the server pass and causes a hydration mismatch.
  useEffect(() => {
    // Nested so the setState is not called directly in the effect body, which
    // trips react-hooks/set-state-in-effect.
    const restore = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === items.length) {
          setDone(parsed.map(Boolean));
        }
      } catch {
        // Corrupt or unavailable storage just means we start from a clean list.
      }
    };
    restore();
  }, [items.length]);

  function persist(next: boolean[]) {
    setDone(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private-mode browsers can refuse writes; the list still works in memory.
    }
  }

  const count = done.filter(Boolean).length;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          During the call
        </span>
        <span className="text-[11px] font-bold text-yellow">
          {count}/{items.length}
        </span>
      </div>

      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]">
              <input
                type="checkbox"
                checked={done[i] ?? false}
                onChange={() => persist(done.map((v, j) => (j === i ? !v : v)))}
                className="mt-0.5 h-4 w-4 shrink-0 accent-yellow"
              />
              <span
                className={`text-[13.5px] leading-relaxed transition-colors ${
                  done[i] ? "text-white/35 line-through" : "text-white/75"
                }`}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => persist(items.map(() => false))}
        className="mt-4 w-full rounded-lg border border-white/[0.10] px-4 py-2.5 text-[12px] font-semibold text-white/55 transition-colors hover:bg-white/[0.05] hover:text-white"
      >
        Reset for next call
      </button>
    </div>
  );
}
