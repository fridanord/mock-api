import { NextRequest, NextResponse } from "next/server";
import Endpoint from "@/models/endpoint";
import { connectDB } from "@/lib/mongodb";

type RouteContext = {
  params: {
    projectId: string;
    path: string[];
  };
};

async function handleMockRequest(
  method: string,
  params: RouteContext["params"]
) {
  try {
    await connectDB();

    const fullPath = "/" + (params.path?.join("/") || "");

    const endpoint = await Endpoint.findOne({
      projectId: params.projectId,
      method,
      path: fullPath,
    });

    if (!endpoint) {
      return NextResponse.json(
        { message: "Mock endpoint not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(endpoint.responseBody, { status: 200 });
  } catch (error) {
    console.error("Mock handler error:", error);

    return NextResponse.json(
      { message: "Kunde inte hämta mock-svar." },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  return handleMockRequest("GET", params);
}