import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    projectApiKey: string;
  }>;
};

type EndpointFromApi = {
  _id: string;
  method: string;
  path: string;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { projectApiKey } = await params;

  const projectId = projectApiKey;
  const origin = request.nextUrl.origin;
  const cookie = request.headers.get("cookie") ?? "";

  const endpointsResponse = await fetch(
    `${origin}/api/endpoints?projectId=${projectId}`,
    {
      headers: {
        cookie,
      },
      cache: "no-store",
    },
  );

  if (!endpointsResponse.ok) {
    return NextResponse.json(
      { message: "Kunde inte hämta endpoints" },
      { status: 500 },
    );
  }

  const endpoints: EndpointFromApi[] = await endpointsResponse.json();

  return NextResponse.json({
    message: "Mock API fungerar",
    count: endpoints.length,
    endpoints: endpoints.map((endpoint) => ({
      method: endpoint.method,
      path: endpoint.path,
      url: `/mock/${projectId}${endpoint.path}`,
    })),
  });
}
