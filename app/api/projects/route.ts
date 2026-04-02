import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const ownerId = searchParams.get("ownerId");

        if (!ownerId) {
            return NextResponse.json({ message: "ownerId saknas"}, { status: 400 });
        }

        const projects = await Project.find({ ownerId }).sort({ createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internt serverfel" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const { name, description, ownerId, initialSchema} = body;

        if (!name || !ownerId) {
            return NextResponse.json({ message: "Namn och ownerId krävs" }, { status: 400 });
        }

        const newProject = await Project.create({
            name,
            description,
            ownerId,
            initialSchema: initialSchema || {},
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ message: "Kunde inte skapa projekt" }, { status: 500 });
    }
}