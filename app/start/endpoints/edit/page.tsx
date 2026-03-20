"use client";

import Link from "next/link";
import EndpointEditor from "@/app/Components/EndpointEditor";

export default function EditEndpointPage() {
  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-6xl flex flex-col gap-6">
        <div>
          <Link href="/start/endpoints" className="btn-ghost mb-4">
            Tillbaka
          </Link>

          <h1 className="text-azure-11">Redigera endpoint</h1>
          <p className="mt-2 text-azure-34">
            Editor med JSON-preview och save-flöde.
          </p>
        </div>

        <div className="card-base p-6">
          <EndpointEditor />
        </div>
      </div>
    </div>
  );
}