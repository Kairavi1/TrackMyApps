import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: {
        userId: session.user.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const application = await prisma.jobApplication.create({
      data: {
        company: body.company,
        role: body.role,

        link: body.link || null,

        salaryMin: body.salaryMin ? Number(body.salaryMin) : null,

        salaryMax: body.salaryMax ? Number(body.salaryMax) : null,

        notes: body.notes || null,

        userId: session.user.id,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}
