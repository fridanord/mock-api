"use client";

import { useMemo, useState } from "react";
import ScenarioPickerCard, {
  EndpointSummary,
  ScenarioSummary,
} from "@/app/Components/ScenarioPickerCard";
import JsonPreview from "@/app/Components/JsonPreview";

type ScenarioWorkspaceProps = {
  projectId: string;
  endpoints: EndpointSummary[];
  initialEndpointId?: string;
};

export default function ScenarioWorkspace({
  projectId,
  endpoints,
  initialEndpointId,
}: ScenarioWorkspaceProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointSummary | undefined>(
    endpoints.find((endpoint) => endpoint.id === initialEndpointId) ?? endpoints[0]
  );

  const [selectedScenario, setSelectedScenario] = useState<ScenarioSummary | undefined>();

  const previewData = useMemo(() => {
    if (!selectedScenario) {
      return {
        message: "No scenario selected yet",
      };
    }

    return selectedScenario.response.bodyTemplate;
  }, [selectedScenario]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
      <div>
        <ScenarioPickerCard
          projectId={projectId}
          endpoints={endpoints}
          initialEndpointId={initialEndpointId}
          onEndpointChange={setSelectedEndpoint}
          onScenarioChange={setSelectedScenario}
        />
      </div>

      <div className="rounded-3xl border border-grey-91 bg-white shadow-[0_20px_50px_rgba(99,102,241,0.12)]">
        <div className="border-b border-grey-91 px-8 py-6">
          <h2 className="text-azure-11">Response</h2>
          <p className="mt-2 text-azure-34">
            Så här ser svaret ut för valt scenario.
          </p>

          {selectedEndpoint ? (
            <p className="mt-3 text-sm text-azure-65">
              Endpoint: {selectedEndpoint.method} {selectedEndpoint.path}
            </p>
          ) : null}

          {selectedScenario ? (
            <p className="mt-2 text-sm font-medium text-azure-65">
              Scenario: {selectedScenario.name} · Status: {selectedScenario.response.status}
            </p>
          ) : null}
        </div>

        <JsonPreview data={previewData} />
      </div>
    </div>
  );
}