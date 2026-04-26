"use client";

import { Session } from "next-auth";

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
        <p className="text-sm uppercase tracking-widest text-slate-400">
          Mockdata.API
        </p>

        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950">
          Bygg endpoints. Testa direkt.
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          Skapa egna URL:er för att öva <code>fetch()</code> utan att sätta upp
          en backend.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            className="rounded-2xl bg-slate-950 px-6 py-3 font-medium text-white"
            onClick={() => onAuthClick("login")}
          >
            Logga in
          </button>

          <button
            type="button"
            className="rounded-2xl border border-slate-200 px-6 py-3 font-medium text-slate-950"
            onClick={() => onAuthClick("register")}
          >
            Skapa konto
          </button>
        </div>

        {session?.user && (
          <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="text-xs text-azure-65">Inloggad användare</div>
            <div className="mt-2 text-sm text-azure-11">
              {session.user.name ?? session.user.email}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
