import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const application = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );
  }

  await prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  await prisma.applicationHistory.create({
    data: {
      applicationId: id,
      oldStage: application.status,
      newStage: status,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const application = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );
  }

  await prisma.jobApplication.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
}
