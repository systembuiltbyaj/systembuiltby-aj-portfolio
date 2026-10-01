"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, [data-cursor]";
const TEXT_ENTRY = "input, textarea, select, [contenteditable='true']";
// Anything larger than this is a card, so the ring becomes a "View" badge
// instead of stretching around the whole card.
const MAX_WRAP_WIDTH = 360;
const MAX_WRAP_HEIGHT = 96;
const WRAP_PAD = 6;
const RING_SIZE = 34;
const BADGE_SIZE = 76;
const FOLLOW = 0.2;

/**
 * Site-wide "magnetic" cursor: a small dot, plus a ring that wraps the button
 * or link under the pointer and becomes a "View" badge over large clickable
 * cards. An element can force either look with data-cursor="wrap" | "view".
 *
 * Only runs for a real mouse with motion allowed, so touch devices and
 * reduced-motion visitors keep the native cursor. Text fields and embedded
 * players (iframes) also keep the native cursor.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allowed = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!allowed.matches || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("magnetic-cursor");

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let target: Element | null = null;
    let visible = false;
    let radius = "999px";
    let badge = false;
    let frame = 0;

    const pick = (el: Element | null) => {
      const blocked = !el || !!el.closest(TEXT_ENTRY) || el.tagName === "IFRAME";
      visible = !!el && !blocked;
      const next = visible && el ? el.closest(INTERACTIVE) : null;
      if (next === target) return;
      target = next;
      // Read the corner radius once per target, not on every frame.
      const corner = target ? parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0 : 0;
      radius = target ? `${corner + WRAP_PAD}px` : "999px";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      pick(e.target instanceof Element ? e.target : null);
    };
    // Scrolling moves content under a still mouse, so re-check what's there.
    const onScroll = () => pick(document.elementFromPoint(mouse.x, mouse.y));
    const onLeave = () => {
      visible = false;
    };

    const tick = () => {
      if (target && !target.isConnected) target = null;

      let width = RING_SIZE;
      let height = RING_SIZE;
      let x = mouse.x - RING_SIZE / 2;
      let y = mouse.y - RING_SIZE / 2;
      let nextBadge = false;

      if (target) {
        const rect = target.getBoundingClientRect();
        const mode = target.getAttribute("data-cursor");
        const isCard = mode === "view" || (mode !== "wrap" && (rect.width > MAX_WRAP_WIDTH || rect.height > MAX_WRAP_HEIGHT));
        if (isCard) {
          nextBadge = true;
          width = height = BADGE_SIZE;
          x = mouse.x - BADGE_SIZE / 2;
          y = mouse.y - BADGE_SIZE / 2;
        } else {
          width = rect.width + WRAP_PAD * 2;
          height = rect.height + WRAP_PAD * 2;
          x = rect.left - WRAP_PAD;
          y = rect.top - WRAP_PAD;
        }
      }

      ringPos.x += (x - ringPos.x) * FOLLOW;
      ringPos.y += (y - ringPos.y) * FOLLOW;

      ring.style.width = `${width}px`;
      ring.style.height = `${height}px`;
      ring.style.borderRadius = target && !nextBadge ? radius : "999px";
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      ring.style.opacity = visible ? "1" : "0";
      if (nextBadge !== badge) {
        badge = nextBadge;
        ring.dataset.badge = String(badge);
        ring.textContent = badge ? "View" : "";
      }

      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      dot.style.opacity = visible && !target ? "1" : "0";

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.classList.remove("magnetic-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-badge="false"
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center border-[1.5px] border-persian-light text-[11px] font-bold uppercase tracking-[0.12em] text-white opacity-0 transition-[width,height,border-radius,background-color,border-color,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform data-[badge=true]:border-persian data-[badge=true]:bg-persian"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#14101f] opacity-0 transition-opacity duration-200 will-change-transform dark:bg-white"
      />
    </>
  );
}
