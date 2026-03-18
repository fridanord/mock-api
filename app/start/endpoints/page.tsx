import Link from "next/link";

const mockEndpoints = [
  {
    id: "1",
    method: "GET",
    path: "/users",
    description: "Hamtar alla anvandare",
    badge: "lista x5",
  },
  {
    id: "2",
    method: "POST",
    path: "/users",
    description: "Skapar en ny anvandare",
  },
  {
    id: "3",
    method: "GET",
    path: "/products",
    description: "Hamtar produkter",
    badge: "lista x10",
  },
  {
    id: "4",
    method: "GET",
    path: "/products/:id",
    description: "Hamtar en produkt via id",
  },
];

function methodBadgeClass(method: string) {
  switch (method) {
    case "GET":
      return "method-badge badge-get";
    case "POST":
      return "method-badge badge-post";
    case "PUT":
      return "method-badge badge-put";
    case "DELETE":
      return "method-dark";
    default:
      return "method-dark";
  }
}

export default function EndpointsPage() {
  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
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

        <div className="card-base">
          <div className="border-b border-grey-91 px-6 py-5">
            <h2 className="text-azure-11">Endpoints</h2>
          </div>

          <div className="divide-y divide-grey-91">
            {mockEndpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className={methodBadgeClass(endpoint.method)}>
                    {endpoint.method}
                  </span>

                  <div className="flex min-w-0 flex-wrap items-center gap-3">
                    <p className="font-mono text-sm text-azure-11">
                      {endpoint.path}
                    </p>

                    {endpoint.badge && (
                      <span className="list-badge">{endpoint.badge}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/start/endpoints/edit?id=${endpoint.id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>

                  <button type="button" className="btn-test">
                    Test
                  </button>

                  <button type="button" className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            Prototyp i canvas: visar UX-flode. I riktig app kopplas detta till Next.js pages och backend-API.
          </div>
        </div>
      </div>
    </div>
  );
}