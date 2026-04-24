"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/start/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    return null;
  }

  return (
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
              <span className="font-mono">fetch()</span> utan att sätta upp en
              backend.
            </p>
          </div>

          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-azure-65">
              Kom igång
            </div>

            <ol className="mt-4 space-y-2 text-sm text-azure-11">
              <li>1) Skapa projekt</li>
              <li>2) Lägg till endpoint (metod + path)</li>
              <li>3) Skriv JSON för 200 och 500</li>
              <li>4) Testa och kopiera URL</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}