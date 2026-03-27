import Link from "next/link";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const mockProjects = [
  {
    id: "1",
    name: "Webshop API",
    description: "Ett API för produkter och användare",
  },
  {
    id: "2",
    name: "Booking API",
    description: "Hantering av bokningar",
  },
];

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/start/login");
  }
  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-5xl flex flex-col gap-6">
        
        {/* Header */}
        <div>
          <h1 className="text-azure-11">Projects</h1>
          <p className="mt-2 text-azure-34">
            Hantera dina projekt och API:er.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="btn-primary">+ Skapa projekt</button>
        </div>

        {/* Lista */}
        <div className="card-base">
          <div className="border-b border-grey-91 px-6 py-5">
            <h2 className="text-azure-11">Dina projekt</h2>
          </div>

          <div className="divide-y divide-grey-91">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-azure-11">{project.name}</h3>
                  <p className="text-azure-34 text-sm">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/start/endpoints"
                    className="btn-secondary"
                  >
                    Öppna
                  </Link>

                  <button className="btn-delete">
                    Ta bort
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            Här visas alla projekt kopplade till ditt konto.
          </div>
        </div>
      </div>
    </div>
  );
}