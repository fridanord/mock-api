import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongoose";
import Endpoint from "@/models/endpoint";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Ogiltigt endpoint-id." },
        { status: 400 }
      );
    }

    const endpoint = await Endpoint.findOne({
      _id: id,
      ownerId: userId,
    });

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint hittades inte." },
        { status: 404 }
      );
    }

    return NextResponse.json(endpoint, { status: 200 });
  } catch (error) {
    console.error("GET /api/endpoints/[id] error:", error);
    return NextResponse.json(
      { message: "Kunde inte hämta endpoint." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Ogiltigt endpoint-id." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const update: Record<string, unknown> = {};
    for (const key of [
      "name",
      "method",
      "path",
      "requestBody",
      "responseBody",
      "generateList",
      "listCount",
    ]) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    const updated = await Endpoint.findOneAndUpdate(
      { _id: id, ownerId: userId },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Endpoint hittades inte." },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/endpoints/[id] error:", error);
    return NextResponse.json(
      { message: "Kunde inte uppdatera endpoint." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Ogiltigt endpoint-id." },
        { status: 400 }
      );
    }

    const deleted = await Endpoint.findOneAndDelete({
      _id: id,
      ownerId: userId,
    });

    if (!deleted) {
      return NextResponse.json(
        { message: "Endpoint hittades inte." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Endpoint raderad.", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/endpoints/[id] error:", error);
    return NextResponse.json(
      { message: "Kunde inte radera endpoint." },
      { status: 500 }
    );
  }
}