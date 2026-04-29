import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    projectApiKey: string;
    endpoint: string[];
  }>;
};

type EndpointFromApi = {
  _id: string;
  method: string;
  path: string;
  responseBody: unknown;
};

async function handleMockRequest(
  request: NextRequest,
  { params }: RouteParams,
) {
  const { projectApiKey, endpoint } = await params;

  const projectId = projectApiKey;
  const path = "/" + endpoint.join("/");
  const method = request.method;

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
    const errorText = await endpointsResponse.text();

    return NextResponse.json(
      {
        message: "Kunde inte hämta endpoints",
        status: endpointsResponse.status,
        error: errorText,
      },
      { status: 500 },
    );
  }

  const endpoints: EndpointFromApi[] = await endpointsResponse.json();

  const matchedEndpoint = endpoints.find(
    (item) => item.path === path && item.method === method,
  );

  if (!matchedEndpoint) {
    return NextResponse.json(
      {
        message: "Endpoint hittades inte",
        method,
        path,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(matchedEndpoint.responseBody);
}

export async function GET(request: NextRequest, context: RouteParams) {
  return handleMockRequest(request, context);
}

export async function POST(request: NextRequest, context: RouteParams) {
  return handleMockRequest(request, context);
}

export async function PUT(request: NextRequest, context: RouteParams) {
  return handleMockRequest(request, context);
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  return handleMockRequest(request, context);
}
