import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { type, start_time, end_time, current_distance, cost, location } =
    await request.json();

  try {
    const memo = await prisma.tbl_drive.create({
      data: {
        type: type,
        start_time: start_time,
        end_time: end_time,
        current_distance: current_distance,
        cost: cost,
        location: location,
      },
    });
    return NextResponse.json(memo);
  } catch (error) {
    console.error("Failed to create data", error);
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = await prisma.tbl_drive.findMany();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
