export default function InfoSection() {
  return (
    <section className="card-base">
      <div className="p-8 md:p-10">
        <h2 className="text-xl font-semibold tracking-tight text-azure-11">
          Hur en student använder det
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Flöde */}
          <div className="rounded-card border border-grey-91 bg-grey-98 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-azure-65">
              Flöde
            </div>

            <ol className="mt-4 space-y-2 text-sm text-azure-11">
              <li>1) Skapa projekt</li>
              <li>2) Skapa endpoint (method + path)</li>
              <li>3) Skriv JSON för 200 och 500</li>
              <li>4) Testa och kopiera URL till din kod</li>
            </ol>
          </div>

          {/* Exempel */}
          <div className="rounded-card border border-grey-91 bg-grey-98 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-azure-65">
              Exempel
            </div>

            <div className="mt-4 rounded-xl border border-grey-91 bg-white p-4">
              <div className="text-xs text-azure-65">Request</div>
              <div className="mt-2 text-xs font-mono text-azure-11">GET /users</div>

              <div className="mt-4 text-xs text-azure-65">Svar</div>
              <div className="mt-2 text-xs font-mono text-azure-11">
                200: {"[{...}]"} &nbsp; / &nbsp; 500: {"{ error: true }"}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-azure-34">
          Tips: När du har skapat endpoints kan du kopiera mock-URL:en och använda
          den direkt i <span className="font-mono">fetch()</span>.
        </p>
      </div>
    </section>
  );
}