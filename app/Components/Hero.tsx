
"use client";

import React from "react";
import { useSession } from "next-auth/react";
import LogRegComponent from "./LogRegComponent";

type AuthMode = "login" | "register";

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
              className="rounded-lg px-2 py-1 text-sm text-azure-65 hover:bg-grey-98"
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
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [mode, setMode] = React.useState<AuthMode>("login");

  React.useEffect(() => {
    if (session?.user) {
      setModalOpen(false);
    }
  }, [session]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Auth submit:", mode, data);
    setModalOpen(false);
  };

  return (
    <>
      <section className="card-base">
        <div className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-azure-65">
            Mockdata.API
          </div>

          <div className="mt-3 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-azure-11">
                Bygg endpoints. Testa direkt.
              </h1>

              <p className="mt-3 text-sm text-azure-34 max-w-[52ch]">
                Skapa egna URL:er för att öva{" "}
                <span className="font-mono">fetch()</span> utan att sätta upp en backend.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setMode("login");
                    setModalOpen(true);
                  }}
                >
                  Logga in
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setMode("register");
                    setModalOpen(true);
                  }}
                >
                  Skapa konto
                </button>
              </div>
            </div>

            <div className="rounded-card border border-grey-91 bg-grey-98 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-azure-65">
                Kom igång
              </div>

              <ol className="mt-4 space-y-2 text-sm text-azure-11">
                <li>1) Skapa projekt</li>
                <li>2) Lägg till endpoint (metod + path)</li>
                <li>3) Skriv JSON för 200 och 500</li>
                <li>4) Testa och kopiera URL</li>
              </ol>

              {session?.user && (
                <div className="mt-5 rounded-xl border border-grey-91 bg-white p-4">
                  <div className="text-xs text-azure-65">Inloggad användare</div>
                  <div className="mt-2 text-sm text-azure-11">
                    {session.user.name ?? session.user.email}
                  </div>
                </div>
              )}
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