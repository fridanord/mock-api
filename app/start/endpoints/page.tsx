"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import EndpointListContainer, {
  FakeEndpoint,
} from "@/app/Components/EndpointListContainer";

const mockEndpoints: FakeEndpoint[] = [
  { id: "1", method: "GET", path: "/users", countLabel: "lista ×5" },
  { id: "2", method: "POST", path: "/users" },
  { id: "3", method: "GET", path: "/products", countLabel: "lista ×10" },
  { id: "4", method: "GET", path: "/products/:id" },
];

export default function EndpointsPage() {
  const router = useRouter();

  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-5xl flex flex-col gap-6">
        <div>
          <Link href="/start/projects" className="btn-ghost mb-4">
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

          <Link href="/start/endpoints/edit" className="btn-primary">
            + Skapa endpoint
          </Link>
        </div>

        <EndpointListContainer
          endpoints={mockEndpoints}
          onEdit={(endpoint) =>
            router.push(`/start/endpoints/edit?id=${endpoint.id}`)
          }
          onTest={(endpoint) => console.log("Test endpoint:", endpoint)}
          onDelete={(endpoint) => console.log("Delete endpoint:", endpoint)}
        />
      </div>
    </div>
  );
}