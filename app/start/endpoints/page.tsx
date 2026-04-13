
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EndpointsClient from "@/app/Components/EndpointsClient";

export default async function EndpointsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/start/login");
  }

  return <EndpointsClient />;
}
