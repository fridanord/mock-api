import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { method, path, responseBody } = body;

    if (!method || !path) {
      return NextResponse.json(
        { message: "Method och path är obligatoriska." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Endpoint sparad.",
        endpoint: {
          method,
          path,
          responseBody,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Ogiltig request." },
      { status: 400 }
    );
  }
}
