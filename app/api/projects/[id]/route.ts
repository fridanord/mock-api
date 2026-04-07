import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";

/* GET, används för att förhandsifylla formuläret på edit sidan */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const project = await Project.findById(id);

        if (!project) {
            return NextResponse.json(
                { message: "Projektet hittades inte" },
                { status: 404 }
            );
        }
        return NextResponse.json(project);
    } catch (error) {
        console.error("Fel vid hämtning av projekt:", error);
        return NextResponse.json(
            { message: "Internt serverfel" },
            { status: 500 }
        );
    }
}

/* PUT -> tar emot id från url:en och ny data.*/
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        /* Uppdaterar dokumentet och returnerar den nya versionen */
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );

        if (!updatedProject) {
            return NextResponse.json(
                { message: "Kunde inte hitta projektet att uppdatera" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("Fel vid uppdatering av projekt:", error);
        return NextResponse.json(
            { message: "Kunde inte spara ändringarna" },
            { status: 500 }
        );
    }
}