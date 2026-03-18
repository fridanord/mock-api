"use client";

import Link from "next/link";
import { useState } from "react";
import EndpointEditor from "@/app/Components/EndpointEditor";
import EditEndpointBase from "@/app/Components/EditEndpointBase";

type EditorVariant = "base" | "full";

export default function EditEndpointPage() {
  const [activeVariant, setActiveVariant] = useState<EditorVariant>("base");

  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-6xl flex flex-col gap-6">
        <div>
          <Link href="/start/endpoints" className="btn-ghost mb-4">
            Tillbaka
          </Link>

          <h1 className="text-azure-11">Redigera endpoint</h1>
          <p className="mt-2 text-azure-34">
            Tillfällig integrationsvy för att jämföra två implementationer.
          </p>
        </div>

        <div className="rounded-card border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800">
          OBS: Två editor-varianter finns just nu i projektet. Använd växeln
          nedan för att jämföra dem. En slutlig lösning ska väljas senare.
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveVariant("base")}
            className={
              activeVariant === "base" ? "btn-primary" : "btn-secondary"
            }
          >
            Variant A – Base component
          </button>

          <button
            type="button"
            onClick={() => setActiveVariant("full")}
            className={
              activeVariant === "full" ? "btn-primary" : "btn-secondary"
            }
          >
            Variant B – Full editor
          </button>
        </div>

        <div className="card-base p-6">
          {activeVariant === "base" ? (
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="text-azure-11">Variant A</h2>
                <p className="mt-1 text-sm text-azure-34">
                  Grundstruktur från tidigare implementation.
                </p>
              </div>

              <EditEndpointBase />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="text-azure-11">Variant B</h2>
                <p className="mt-1 text-sm text-azure-34">
                  Editor med JSON-preview och save-flöde.
                </p>
              </div>

              <EndpointEditor />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}