import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongoose";
import Endpoint from "@/models/endpoint";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Ogiltigt endpoint-id." }, { status: 400 });
        }

        const endpoint = await Endpoint.findById(id);

        if (!endpoint) {
            return NextResponse.json({ message: "Endpoint hittades inte." }, { status: 404 });
        }

        return NextResponse.json(endpoint, { status: 200 });
    } catch (error) {
        console.error("GET /api/endpoints/[id] error:", error);
        return NextResponse.json({ message: "Kunde inte hämta endpoint." }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Ogiltigt endpoint-id." }, { status: 400 });
        }

        const body = await request.json();

        // Keep this tight so callers can't accidentally overwrite fields you don't want changed.
        const update: Record<string, unknown> = {};
        for (const key of ["name", "method", "path", "requestBody", "responseBody", "generateList", "listCount"]) {
            if (body[key] !== undefined) update[key] = body[key];
        }

        const updated = await Endpoint.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json({ message: "Endpoint hittades inte." }, { status: 404 });
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("PUT /api/endpoints/[id] error:", error);
        return NextResponse.json({ message: "Kunde inte uppdatera endpoint." }, { status: 500 });
    }
}