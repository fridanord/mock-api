import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import Endpoint from "@/models/endpoint";

/* GET -> Hämtar alla projekt för en specifik användare, ex: /api/projects?owner=123 */
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const ownerId = searchParams.get("ownerId");

        if (!ownerId) {
            return NextResponse.json({ message: "ownerId saknas"}, { status: 400 });
        }

        const projects = await Project.find({ ownerId }).sort({ createdAt: -1 });

        const projectsWithCounts = await Promise.all(
            projects.map(async (project) => {
                const endpointCount = await Endpoint.countDocuments({
                    projectId: project._id,
                });

                return {
                    ...project.toObject(),
                    endpointCount,
                };
            })
        );

        return NextResponse.json(projectsWithCounts);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internt serverfel" }, { status: 500 });
    }
}

/* POST, förväntar sig name, ownerId och valfri description/initialSchema */
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const { name, description, ownerId, initialSchema} = body;

        // Validering för att säkerhetsställa att vi har det viktigaste.
        if (!name || !ownerId) {
            return NextResponse.json({ message: "Namn och ownerId krävs" }, { status: 400 });
        }

        // Skapar dokumentet i DB, Api-nyckel genereras automatiskt av modellen
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