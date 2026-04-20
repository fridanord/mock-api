import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongoose";
import Scenario from "@/models/Scenario";
import Endpoint from "@/models/endpoint";

export async function POST(req: Request) {
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
    const body = await req.json();

    const {
      endpointId,
      projectId,
      name,
      statusCode,
      responseBody,
      requestBody,
      headers,
      delay,
      isDefault,
      isActive,
    } = body;

    if (!endpointId || !projectId || !name || responseBody === undefined) {
      return NextResponse.json(
        {
          message:
            "endpointId, projectId, name och responseBody krävs för att skapa scenario.",
        },
        { status: 400 }
      );
    }

    const endpoint = await Endpoint.findOne({
      _id: endpointId,
      projectId,
      ownerId: userId,
    });

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint hittades inte eller tillhör inte användaren." },
        { status: 404 }
      );
    }

    if (isActive === true) {
      await Scenario.updateMany(
        {
          ownerId: userId,
          projectId,
          endpointId,
        },
        { $set: { isActive: false } }
      );
    }

    const newScenario = await Scenario.create({
      ownerId: userId,
      projectId,
      endpointId,
      name,
      statusCode: statusCode ?? 200,
      responseBody,
      requestBody: requestBody ?? null,
      headers: headers ?? {},
      delay: delay ?? 0,
      isDefault: isDefault ?? false,
      isActive: isActive ?? false,
    });

    return NextResponse.json(newScenario, { status: 201 });
  } catch (error: any) {
    console.error("Error creating scenario:", error);
    return NextResponse.json(
      { message: "Kunde inte skapa scenario.", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
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
    const { searchParams } = new URL(req.url);
    const endpointId = searchParams.get("endpointId");
    const projectId = searchParams.get("projectId");

    if (!endpointId || !projectId) {
      return NextResponse.json(
        { message: "Både endpointId och projectId krävs." },
        { status: 400 }
      );
    }

    const endpoint = await Endpoint.findOne({
      _id: endpointId,
      projectId,
      ownerId: userId,
    });

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint hittades inte eller tillhör inte användaren." },
        { status: 404 }
      );
    }

    const scenarios = await Scenario.find({
      ownerId: userId,
      projectId,
      endpointId,
    }).sort({ createdAt: -1 });

    return NextResponse.json(scenarios, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Kunde inte hämta scenarios.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
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
    const body = await req.json();
    const { scenarioId, endpointId, projectId } = body;

    if (!scenarioId || !endpointId || !projectId) {
      return NextResponse.json(
        { message: "scenarioId, endpointId och projectId krävs." },
        { status: 400 }
      );
    }

    const endpoint = await Endpoint.findOne({
      _id: endpointId,
      projectId,
      ownerId: userId,
    });

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint hittades inte eller tillhör inte användaren." },
        { status: 404 }
      );
    }

    await Scenario.updateMany(
      {
        ownerId: userId,
        projectId,
        endpointId,
      },
      { $set: { isActive: false } }
    );

    const updatedScenario = await Scenario.findOneAndUpdate(
      {
        _id: scenarioId,
        ownerId: userId,
        projectId,
        endpointId,
      },
      { $set: { isActive: true } },
      { new: true }
    );

    if (!updatedScenario) {
      return NextResponse.json(
        { message: "Scenario hittades inte." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedScenario, { status: 200 });
  } catch (error: any) {
    console.error("DETALJERAT FEL:", error);
    return NextResponse.json(
      { message: "Kunde inte uppdatera scenario.", error: error.message },
      { status: 500 }
    );
  }
}