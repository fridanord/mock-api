import Link from "next/link";
import EndpointEditor from "@/app/Components/EndpointEditor";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ projectId?: string }>;
};

export default async function EditEndpointPage({
  params,
  searchParams,
}: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/start/login");

  const { id } = await params;
  const { projectId = "" } = await searchParams;

  if (!projectId) {
    return (
      <div className="h-full w-full overflow-y-auto p-8">
        <div className="max-w-6xl flex flex-col gap-6">
          <div>
            <h1 className="text-azure-11">Redigera endpoint</h1>
            <p className="mt-2 text-azure-34">ProjectId saknas i URL.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-8">
      <div className="max-w-6xl flex flex-col gap-6">
        <div>
          <Link
            href={`/start/endpoints?projectId=${projectId}`}
            className="btn-ghost mb-4"
          ><ArrowLeft size={16} />
            Tillbaka
          </Link>

          <h1 className="text-azure-11">Redigera endpoint</h1>
        </div>

        <div className="card-base p-6">
          <EndpointEditor endpointId={id} />
        </div>
      </div>
    </div>
  );
}