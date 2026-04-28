import React from "react";
import { Info, Code2, Rocket, FolderOpen, Braces, Play } from "lucide-react";
import IconBox from "./IconBox";

export default function StartInfoCards() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <article className="card-base">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3">
            <IconBox color="bg-purple-100 text-purple-600">
              <Rocket className="h-5 w-5" />
            </IconBox>

            <h2 className="text-xl font-semibold text-[var(--color-text-main)]">
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
            <IconBox color="bg-[var(--color-surface-muted)] text-[var(--color-text-main)]">
              <Code2 className="h-5 w-5" />
            </IconBox>

            <h2 className="text-xl font-semibold text-[var(--color-text-main)]">
              Exempel
            </h2>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 font-mono text-sm text-[var(--color-text-main)]">
            <p className="text-[var(--color-text-muted)]">Request</p>
            <p className="mt-2">GET /users</p>

            <p className="mt-5 text-[var(--color-text-muted)]">Svar</p>
            <p className="mt-2">
              <span className="text-[var(--color-valid)]">200</span>:
              [&#123;...&#125;]
              <span className="px-3 text-[var(--color-text-muted)]">/</span>
              <span className="text-[var(--color-invalid)]">500</span>: &#123;
              error: true &#125;
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-grey-97)] p-4 text-sm text-[var(--color-text-main)]">
            <Info className="h-5 w-5 text-[var(--color-blue-59)]" />
            <p>
              <span className="font-semibold">Tips:</span> Använd mock-URL:en
              direkt i din <code>fetch()</code>.
            </p>
          </div>
        </div>
      </article>
    </section>
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
        <p className="font-semibold text-[var(--color-text-main)]">{title}</p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{text}</p>
      </div>
    </div>
  );
}
