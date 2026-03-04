"use client";

import React from "react";
import LogRegComponent from "../../Components/LogRegComponent"; // ✅ justera om sökvägen skiljer

type AuthMode = "login" | "register";

function ButtonPrimary({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        rounded-xl px-4 py-2 text-sm font-medium
        bg-[rgb(var(--brand))] text-[rgb(var(--brand-contrast))]
        hover:opacity-90
      "
    >
      {children}
    </button>
  );
}

function ButtonSecondary({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        rounded-xl px-4 py-2 text-sm font-medium
        border border-[rgb(var(--border))]
        bg-[rgb(var(--surface))] text-[rgb(var(--text))]
        hover:bg-[rgb(var(--surface-2))]
      "
    >
      {children}
    </button>
  );
}

function Modal({
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
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* dialog */}
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-[0_20px_60px_rgba(0,0,0,0.20)]">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-[rgb(var(--muted))]">
                Mockdata.API
              </div>
              <div className="mt-1 text-xl font-semibold tracking-tight text-[rgb(var(--text))]">
                {title}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-[rgb(var(--muted))] hover:bg-[rgb(var(--surface-2))]"
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

export default function Hero() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState<AuthMode>("login");

  // ✅ Typen här kan du senare byta till exakt typen som LogRegComponent skickar
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Auth submit:", mode, data);
    // TODO: koppla API senare (eller LogRegComponent gör det redan)
    // Stäng modal vid success:
    setModalOpen(false);
  };

  return (
    <>
      <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-[rgb(var(--muted))]">
            Mockdata.API
          </div>

          <div className="mt-3 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[rgb(var(--text))]">
                Bygg endpoints. Testa direkt.
              </h1>

              <p className="mt-3 text-sm text-[rgb(var(--muted))] max-w-[52ch]">
                Skapa egna URL:er för att öva <span className="font-mono">fetch()</span>{" "}
                utan att sätta upp en backend.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonPrimary
                  onClick={() => {
                    setMode("login");
                    setModalOpen(true);
                  }}
                >
                  Logga in
                </ButtonPrimary>

                <ButtonSecondary
                  onClick={() => {
                    setMode("register");
                    setModalOpen(true);
                  }}
                >
                  Skapa konto
                </ButtonSecondary>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted))]">
                Kom igång
              </div>

              <ol className="mt-4 space-y-2 text-sm text-[rgb(var(--text))]">
                <li>1) Skapa projekt</li>
                <li>2) Lägg till endpoint (metod + path)</li>
                <li>3) Skriv JSON för 200 och 500</li>
                <li>4) Testa och kopiera URL</li>
              </ol>

              <div className="mt-5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
                <div className="text-xs text-[rgb(var(--muted))]">Exempel</div>
                <div className="mt-2 text-xs font-mono text-[rgb(var(--text))]">
                  GET /users → 200 / 500 → kopiera URL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === "register" ? "Skapa konto" : "Logga in"}
      >
        <LogRegComponent mode={mode} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}
