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

        const projects = await Project.find({ ownerId });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internt serverfel" }, { status: 500 });
    }
}