import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email och lösenord krävs." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "En användare med den emailen finns redan." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name ?? "",
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Användare skapad.",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/register error:", error);
    return NextResponse.json(
      { message: "Kunde inte registrera användaren." },
      { status: 500 }
    );
  }
}