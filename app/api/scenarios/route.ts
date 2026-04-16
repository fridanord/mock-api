import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Scenario from "@/models/Scenario";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        if (!body.endpointId) {
            return NextResponse.json(
                { message: "endpointId krävs för att koppla scenariot."},
                { status: 400 }
            );
        }

        const newScenario = await Scenario.create(body);

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
    const { searchParams } = new URL(req.url);
    const endpointId = searchParams.get("endpointId");

    if (!endpointId) {
      return NextResponse.json(
        { message: "endpointId krävs." },
        { status: 400 }
      );
    }

   
    const scenarios = await Scenario.find({ endpointId });

    return NextResponse.json(scenarios, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Kunde inte hämta scenarios.", error: error.message },
      { status: 500 }
    );
  }
}