import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const body = await req.json();

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

    const updated = await prisma.$transaction([
      prisma.jobApplication.update({
        where: {
          id,
        },

        data: {
          status: body.status,
        },
      }),

      prisma.applicationHistory.create({
        data: {
          oldStage: application.status,

          newStage: body.status,

          applicationId: application.id,
        },
      }),
    ]);

    return NextResponse.json(updated);

    return NextResponse.json(updated);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}
