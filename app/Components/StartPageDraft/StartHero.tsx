"use client";

import type { Session } from "next-auth";

type AuthMode = "login" | "register";

export default function StartHero({
  session,
  onAuthClick,
}: {
  session: Session | null;
  onAuthClick: (mode: AuthMode) => void;
}) {
  return (
    <section className="card-base">
      <div className="p-8 md:p-10">
        <p className="text-sm uppercase tracking-widest text-[var(--color-azure-65)]">
          Mockdata.API
        </p>

        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-text-main)]">
          Bygg endpoints. Testa direkt.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
          Skapa egna URL:er för att öva <code>fetch()</code> utan att sätta upp
          en backend.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            className="btn-primary"
            onClick={() => onAuthClick("login")}
          >
            Logga in
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => onAuthClick("register")}
          >
            Skapa konto
          </button>
        </div>

        {session?.user && (
          <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
            <div className="text-xs text-[var(--color-text-muted)]">
              Inloggad användare
            </div>
            <div className="mt-2 text-sm text-[var(--color-text-main)]">
              {session.user.name ?? session.user.email}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
