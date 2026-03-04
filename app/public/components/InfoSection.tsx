export default function InfoSection() {
  return (
    <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="p-8 md:p-10">
        <h2 className="text-xl font-semibold tracking-tight text-[rgb(var(--text))]">
          Hur en student använder det
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted))]">
              Flöde
            </div>
            <ol className="mt-4 space-y-2 text-sm text-[rgb(var(--text))]">
              <li>1) Skapa projekt</li>
              <li>2) Skapa endpoint (method + path)</li>
              <li>3) Skriv JSON för 200 och 500</li>
              <li>4) Testa och kopiera URL till din kod</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--muted))]">
              Exempel
            </div>
            <div className="mt-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
              <div className="text-xs text-[rgb(var(--muted))]">Request</div>
              <div className="mt-2 text-xs font-mono text-[rgb(var(--text))]">
                GET /users
              </div>
              <div className="mt-4 text-xs text-[rgb(var(--muted))]">Svar</div>
              <div className="mt-2 text-xs font-mono text-[rgb(var(--text))]">
                200: [{"{...}"}] &nbsp; / &nbsp; 500: {"{ error: true }"}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-[rgb(var(--muted))]">
          Tips: När du har skapat endpoints kan du kopiera mock-URL:en och använda den direkt i{" "}
          <span className="font-mono">fetch()</span>.
        </p>
      </div>
    </section>
  );
}
