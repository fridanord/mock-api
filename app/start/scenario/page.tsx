import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ScenarioPickerCard from "@/app/Components/ScenarioPickerCard";
import Endpoint from "@/models/endpoint";
import { connectDB } from "@/lib/mongoose";

type ScenarioPageProps = {
  searchParams: Promise<{
    projectId?: string;
    endpointId?: string;
  }>;
};

export default async function ScenarioPage({
  searchParams,
}: ScenarioPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/start/login");
  }

  const userId = (session.user as { id: string }).id;
  const { projectId = "", endpointId = "" } = await searchParams;

  if (!projectId) {
    return (
      <div className="h-full w-full overflow-y-auto p-8">
        <div className="max-w-5xl flex flex-col gap-6">
          <div>
            <h1 className="text-azure-11 text-3xl font-bold">Scenario</h1>
            <p className="mt-2 text-azure-34">
              Bygg och testa olika API-scenarion.
            </p>
          </div>

          <div className="text-center p-12 border-2 border-dashed border-grey-91 rounded-3xl">
            <h2 className="text-azure-11 font-semibold">ProjectId saknas</h2>
            <p className="text-azure-34 mt-2">
              Gå tillbaka till projektlistan och öppna ett projekt först.
            </p>
          </div>
        </div>
      </div>
    );
  }

  await connectDB();

  const data = await Endpoint.find({
    ownerId: userId,
    projectId,
  })
    .sort({ createdAt: -1 })
    .lean();

  const endpoints = JSON.parse(JSON.stringify(data)).map((endpoint: any) => ({
    ...endpoint,
    id: endpoint._id,
  }));

  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-5xl flex flex-col gap-6">
        <div>
          <h1 className="text-azure-11 text-3xl font-bold">Scenario</h1>
          <p className="mt-2 text-azure-34">
            Bygg och testa olika API-scenarion.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-blue-50/30 p-4 border border-blue-100">
          <span className="text-xl">ℹ️</span>
          <p className="text-sm text-azure-65">
            Här kommer du kunna kombinera endpoints och simulera flöden.
          </p>
        </div>

        <div className="flex justify-center py-8">
          {endpoints && endpoints.length > 0 ? (
            <ScenarioPickerCard
              projectId={projectId}
              endpoints={endpoints}
              initialEndpointId={endpointId}
            />
          ) : (
            <div className="text-center p-12 border-2 border-dashed border-grey-91 rounded-3xl">
              <h2 className="text-azure-11 font-semibold">Inga endpoints hittades</h2>
              <p className="text-azure-34 mt-2">
                Skapa en endpoint först för att kunna hantera scenarion.
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-azure-65 mt-4">
          Scenario används för att simulera riktiga API-anrop i kedjor.
        </div>
      </div>
    </div>
  );
}