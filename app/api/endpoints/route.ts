import { NextResponse } from "next/server";
import Endpoint from "@/models/endpoint";
import { connectDB } from "@/lib/mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "projectId krävs för att hämta endpoints." },
        { status: 400 }
      );
    }

    const endpoints = await Endpoint.find({ projectId }).sort({ createdAt: -1 });

    return NextResponse.json(endpoints, { status: 200 });
  } catch (error) {
    console.error("GET /api/endpoints error:", error);
    return NextResponse.json(
      { message: "Kunde inte hämta endpoints." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      projectId,
      method,
      path,
      requestBody,
      responseBody,
      generateList,
      listCount,
    } = body;

    if (!name || !projectId || !method || !path || responseBody === undefined) {
      return NextResponse.json(
        { message: "name, projectId, method, path och responseBody krävs." },
        { status: 400 }
      );
    }

    const endpoint = await Endpoint.create({
      name,
      projectId,
      method,
      path,
      requestBody: requestBody ?? null,
      responseBody,
      generateList: generateList ?? false,
      listCount: listCount ?? 0,
    });

    return NextResponse.json(endpoint, { status: 201 });
  } catch (error) {
    console.error("POST /api/endpoints error:", error);
    return NextResponse.json(
      { message: "Kunde inte skapa endpoint." },
      { status: 500 }
    );
  }
}