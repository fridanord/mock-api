import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



import type { EndpointSummary } from "@/app/Components/Mocktypes/mocktypes";
import { mockEndpoints } from "@/app/Components/Mocktypes/mockData";
import ScenarioNewPicker from "@/app/Components/ScenarioPickerCard";
import ScenarioPickerCard from "@/app/Components/ScenarioPickerCard";


export default async function ScenarioPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/start/login");
  }
  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-5xl flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-azure-11">Scenario</h1>
          <p className="mt-2 text-azure-34">
            Bygg och testa olika API-scenarion.
          </p>
        </div>

        {/* Info */}
        <div className="info-box">
          <span>ℹ️</span>
          <p>
            Här kommer du kunna kombinera endpoints och simulera flöden.
          </p>
        </div>

        {/* Placeholder card */}
        {/* <div className="card-base p-8 flex flex-col items-center justify-center text-center gap-4">
          <h2 className="text-azure-11">Inga scenarion ännu</h2>
          <p className="text-azure-34 max-w-md">
            Skapa ditt första scenario för att börja testa API-flöden mellan endpoints.
          </p>

          <button className="btn-primary">
            + Skapa scenario
          </button>
        </div> */}


        <div className="flex justify-center py-8">
          <ScenarioPickerCard endpoints={mockEndpoints as EndpointSummary[]} />
        </div>


        {/* Footer hint */}
        <div className="card-footer">
          Scenario används för att simulera riktiga API-anrop i kedjor.
        </div>
      </div>
    </div>
  );
}