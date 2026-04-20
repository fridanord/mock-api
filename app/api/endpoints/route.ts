import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Endpoint from "@/models/endpoint";
import Project from "@/models/Project";
import Scenario from "@/models/Scenario";
import { connectDB } from "@/lib/mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = (session.user as { id: string }).id;

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "projectId krävs för att hämta endpoints." },
        { status: 400 }
      );
    }

    const project = await Project.findOne({
      _id: projectId,
      ownerId: userId,
    });

    if (!project) {
      return NextResponse.json(
        { message: "Projektet hittades inte eller tillhör inte användaren." },
        { status: 404 }
      );
    }

    const endpoints = await Endpoint.find({
      ownerId: userId,
      projectId,
    }).sort({ createdAt: -1 });

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

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = (session.user as { id: string }).id;

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

    console.log("POST /api/endpoints projectId:", projectId);
    console.log("POST /api/endpoints userId:", userId);

    const project = await Project.findOne({
      _id: projectId,
      ownerId: userId,
    });

    console.log("Matched project:", project);

    if (!project) {
      return NextResponse.json(
        { message: "Projektet hittades inte eller tillhör inte användaren." },
        { status: 400 }
      );
    }

    const endpoint = await Endpoint.create({
      name,
      ownerId: userId,
      projectId,
      method,
      path,
      requestBody: requestBody ?? null,
      responseBody,
      generateList: generateList ?? false,
      listCount: listCount ?? 0,
    });

    {/*await Scenario.create({
      ownerId: userId,
      projectId,
      endpointId: endpoint._id,
      name: "Success Case",
      statusCode: 200,
      responseBody,
      requestBody: requestBody ?? null,
      headers: {},
      delay: 0,
      isDefault: true,
      isActive: true,
    }); */}

    await Scenario.insertMany([
  {
    ownerId: userId,
    projectId,
    endpointId: endpoint._id,
    name: "Success Case",
    statusCode: 200,
    responseBody,
    requestBody: requestBody ?? null,
    headers: {},
    delay: 0,
    isDefault: true,
    isActive: true,
  },
  {
    ownerId: userId,
    projectId,
    endpointId: endpoint._id,
    name: "Error Case",
    statusCode: 500,
    responseBody: { message: "Internal Server Error" },
    requestBody: requestBody ?? null,
    headers: {},
    delay: 0,
    isDefault: false,
    isActive: false,
  },
  {
    ownerId: userId,
    projectId,
    endpointId: endpoint._id,
    name: "Not Found",
    statusCode: 404,
    responseBody: { message: "Not Found" },
    requestBody: requestBody ?? null,
    headers: {},
    delay: 0,
    isDefault: false,
    isActive: false,
  },
]);

    return NextResponse.json(endpoint, { status: 201 });
  } catch (error) {
    console.error("POST /api/endpoints error:", error);
    return NextResponse.json(
      { message: "Kunde inte skapa endpoint." },
      { status: 500 }
    );
  }
}