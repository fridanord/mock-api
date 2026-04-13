import { connectDB } from "@/lib/mongoose";
import Test from "@/models/test";

export async function GET() {
  try {
    await connectDB();
    const tests = await Test.find();

    return Response.json(
      {
        message: "Test data fetched successfully",
        data: tests,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch test data",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectDB();

    const newTest = await Test.create({
      message: "MongoDB test works",
    });

    return Response.json(
      {
        message: "Test data saved successfully",
        data: newTest,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to save test data",
        error,
      },
      { status: 500 }
    );
  }
}