"use client";

import { Info, Code2, Rocket, FolderOpen, Braces, Play } from "lucide-react";

export default function StartPageDraft() {
  return (
    <div className="space-y-6">
      <section className="card-base">
        <div className="p-8 md:p-10">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Mockdata.API
          </p>

          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950">
            Bygg endpoints. Testa direkt.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Skapa egna URL:er för att öva <code>fetch()</code> utan att sätta
            upp en backend.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-2xl bg-slate-950 px-6 py-3 font-medium text-white">
              Logga in
            </button>

            <button className="rounded-2xl border border-slate-200 px-6 py-3 font-medium text-slate-950">
              Skapa konto
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="card-base">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <IconBox color="bg-purple-100 text-purple-600">
                <Rocket className="h-5 w-5" />
              </IconBox>

              <h2 className="text-xl font-semibold text-slate-950">
                Kom igång snabbt
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              <Step
                icon={<FolderOpen className="h-5 w-5" />}
                color="bg-purple-100 text-purple-600"
                title="Skapa projekt"
                text="Organisera dina endpoints i projekt."
              />

              <Step
                icon={<Code2 className="h-5 w-5" />}
                color="bg-blue-100 text-blue-600"
                title="Lägg till endpoint"
                text="Välj HTTP-method och ange en path."
              />

              <Step
                icon={<Braces className="h-5 w-5" />}
                color="bg-green-100 text-green-600"
                title="Definiera svar"
                text="Skriv JSON för både lyckade och felaktiga svar."
              />

              <Step
                icon={<Play className="h-5 w-5" />}
                color="bg-yellow-100 text-yellow-600"
                title="Testa och använd"
                text="Kopiera URL:en och använd i din kod med fetch()."
              />
            </div>
          </div>
        </article>

        <article className="card-base">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <IconBox color="bg-slate-100 text-slate-700">
                <Code2 className="h-5 w-5" />
              </IconBox>

              <h2 className="text-xl font-semibold text-slate-950">Exempel</h2>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-900">
              <p className="text-slate-400">Request</p>
              <p className="mt-2">GET /users</p>

              <p className="mt-5 text-slate-400">Svar</p>
              <p className="mt-2">
                <span className="text-emerald-600">200</span>: [&#123;...&#125;]
                <span className="px-3 text-slate-400">/</span>
                <span className="text-rose-600">500</span>: &#123; error: true
                &#125;
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
              <Info className="h-5 w-5 text-blue-600" />
              <p>
                <span className="font-semibold">Tips:</span> Använd mock-URL:en
                direkt i din <code>fetch()</code>.
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

function Step({
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
    <div className="flex gap-4">
      <IconBox color={color}>{icon}</IconBox>

      <div>
        <p className="font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function IconBox({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${color}`}
    >
      {children}
    </div>
  );
}
