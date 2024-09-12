import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const { no } = params;

  try {
    const deletedRecord = await prisma.tbl_drive.delete({
      where: { no: Number(no) },
    });

    return NextResponse.json({ message: "Record deleted", deletedRecord });
  } catch (error) {
    console.error("Failed to delete record:", error);
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
