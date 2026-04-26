"use client";

import React from "react";

export default function AuthModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-6">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative w-full max-w-md">
        <div className="card-base shadow-[0_20px_60px_rgba(0,0,0,0.20)]">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-azure-65">
                Mockdata.API
              </div>
              <div className="mt-1 text-xl font-semibold tracking-tight text-azure-11">
                {title}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
