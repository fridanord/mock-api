"use client";

import { FolderOpen, Code2, Play } from "lucide-react";
import IconBox from "./IconBox";

type LoggedInStartProps = {
  userName: string;
};

// Funktion = hälsning baserat på tid
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 10) return "God morgon";
  if (hour < 17) return "God dag";
  if (hour < 22) return "God kväll";
  return "God natt";
}

export default function LoggedInStart({ userName }: LoggedInStartProps) {
  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      {/* HERO */}
      <section className="card-base">
        <div className="p-8 md:p-10">
          <p className="text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
            Mockdata.API
          </p>

          {/* Dynamisk hälsning */}
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[var(--color-text-main)]">
            {greeting}, {userName}!
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
            Här kan du fortsätta arbeta med dina projekt och endpoints.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/start/projects" className="btn-primary">
              Mina projekt
            </a>

            {/* <a href="/start/endpoints" className="btn-secondary">
              Mina endpoints
            </a> */}
          </div>
        </div>
      </section>

      {/* QUICK CARDS */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <QuickCard
          icon={<FolderOpen className="h-5 w-5" />}
          color="bg-purple-100 text-purple-600"
          title="Fortsätt med projekt"
          text="Öppna dina sparade projekt och fortsätt där du slutade."
        />

        <QuickCard
          icon={<Code2 className="h-5 w-5" />}
          color="bg-blue-100 text-blue-600"
          title="Hantera endpoints"
          text="Skapa, redigera eller testa dina mock-endpoints."
        />

        <QuickCard
          icon={<Play className="h-5 w-5" />}
          color="bg-green-100 text-green-600"
          title="Testa API"
          text="Kopiera din URL och använd den direkt i din kod."
        />
      </section>
    </div>
  );
}

// Återanvändbar card-komponent
function QuickCard({
  icon,
  color,
  title,
  text,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  text: string;
}) {
  return (
    <article className="card-base">
      <div className="p-6">
        <IconBox color={color}>{icon}</IconBox>

        <h2 className="mt-4 text-xl font-semibold text-[var(--color-text-main)]">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          {text}
        </p>
      </div>
    </article>
  );
}
