"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EndpointListContainer, {
  FakeEndpoint,
} from "@/app/Components/EndpointListContainer";
import { ArrowLeft } from "lucide-react";

type EndpointFromApi = {
  _id: string;
  name: string;
  projectId: string;
  method: FakeEndpoint["method"];
  path: string;
  requestBody: unknown;
  responseBody: unknown;
  generateList?: boolean;
  listCount?: number;
};

type ProjectFromApi = {
  _id: string;
  name: string;
  apiKey?: string;
};

export default function EndpointsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") ?? "";

  const [projectName, setProjectName] = useState("");
  const [projectApiKey, setProjectApiKey] = useState("");
  const [endpoints, setEndpoints] = useState<FakeEndpoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectAndEndpoints = async () => {
      if (!projectId) {
        setError("Välj eller skapa ett projekt först.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const [projectResponse, endpointsResponse] = await Promise.all([
          fetch(`/api/projects/${projectId}`),
          fetch(`/api/endpoints?projectId=${projectId}`),
        ]);

        const projectData: ProjectFromApi = await projectResponse.json();
        const endpointsData: EndpointFromApi[] = await endpointsResponse.json();

        if (!projectResponse.ok) {
          throw new Error(projectData?.name || "Kunde inte hämta projekt.");
        }

        if (!endpointsResponse.ok) {
          throw new Error("Kunde inte hämta endpoints.");
        }

        setProjectName(projectData.name ?? "");
        setProjectApiKey(projectData.apiKey ?? "");

        const mappedEndpoints: FakeEndpoint[] = endpointsData.map((endpoint) => ({
          id: endpoint._id,
          method: endpoint.method,
          path: endpoint.path,
          countLabel:
            endpoint.generateList && endpoint.listCount
              ? `lista ×${endpoint.listCount}`
              : undefined,
        }));

        setEndpoints(mappedEndpoints);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Något gick fel vid hämtning."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectAndEndpoints();
  }, [projectId]);

  const handleDelete = async (endpoint: FakeEndpoint) => {
    const confirmed = window.confirm(
      `Vill du radera endpointen ${endpoint.method} ${endpoint.path}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`/api/endpoints/${endpoint.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kunde inte radera endpoint.");
      }

      setEndpoints((current) =>
        current.filter((item) => item.id !== endpoint.id)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Något gick fel vid radering."
      );
    }
  };

  const baseUrl = projectApiKey
    ? `https://mockdata.example/mock/${projectApiKey}`
    : "Base URL saknas";

  const handleCopyBaseUrl = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl);
    } catch {
      setError("Kunde inte kopiera Base URL.");
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-5xl flex flex-col gap-6">
        <div>
          <Link href="/start/projects" className="btn-ghost mb-4">
            <ArrowLeft size={16} />
            Tillbaka
          </Link>

          <h1 className="text-azure-11">
            Projekt: {projectName || "Laddar projekt..."}
          </h1>
          <p className="mt-2 text-azure-34">Base URL (idé): {baseUrl}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCopyBaseUrl}
          >
            Kopiera Base URL
          </button>

          <Link
            href={`/start/endpoints/edit?projectId=${projectId}`}
            className="btn-primary"
          >
            + Skapa endpoint
          </Link>
        </div>

        {isLoading && (
          <div className="card-base p-6">
            <p className="text-azure-34">Laddar endpoints...</p>
          </div>
        )}

        {error && (
          <div className="card-base p-6">
            <p className="status-invalid inline-flex items-center gap-2">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && endpoints.length === 0 && (
          <div className="card-base p-6">
            <p className="text-azure-34">
              Inga endpoints hittades för detta projekt än.
            </p>
          </div>
        )}

        {!isLoading && !error && endpoints.length > 0 && (
          <EndpointListContainer
            endpoints={endpoints}
            onEdit={(endpoint) =>
              router.push(
                `/start/endpoints/${endpoint.id}/edit?projectId=${projectId}`
              )
            }
            onTest={(endpoint) => {
              router.push(
                `/start/scenario?projectId=${projectId}&endpointId=${endpoint.id}`
              );
            }}
            onDelete={(endpoint) => {
              handleDelete(endpoint);
            }}
          />
        )}
      </div>
    </div>
  );
}