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

export default function EndpointsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") ?? "";

  const [endpoints, setEndpoints] = useState<FakeEndpoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEndpoints = async () => {
      if (!projectId) {
        setError("Välj eller skapa ett projekt först. ");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `/api/endpoints?projectId=${projectId}`
        );

        const data: EndpointFromApi[] = await response.json();

        if (!response.ok) {
          throw new Error("Kunde inte hamta endpoints.");
        }

        const mappedEndpoints: FakeEndpoint[] = data.map((endpoint) => ({
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
          err instanceof Error ? err.message : "Nagot gick fel vid hamtning."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEndpoints();
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
        err instanceof Error ? err.message : "Nagot gick fel vid radering."
      );
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

          <h1 className="text-azure-11">Projekt: Webshop API</h1>
          <p className="mt-2 text-azure-34">
            Base URL (ide): https://mockdata.example/mock/p_6546ae33703058
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-secondary">
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
              Inga endpoints hittades for detta projekt an.
            </p>
          </div>
        )}

        {!isLoading && !error && endpoints.length > 0 && (
          <EndpointListContainer
            endpoints={endpoints}
            onEdit={(endpoint) =>
              router.push(`/start/endpoints/${endpoint.id}/edit?projectId=${projectId}`)
            }
            onTest={(endpoint) => {
              router.push(
                 `/start/scenario?projectId=${projectId}&endpointId=${endpoint.id}`
              );
              //console.log("Test endpoint:", endpoint);
            }}
            onDelete={(endpoint) => {
              console.log("Deleted endpoint:", endpoint);
              handleDelete(endpoint);
            }}
          />
        )}
      </div>
    </div>
  );
}