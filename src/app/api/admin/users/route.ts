import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// API route สำหรับ admin เท่านั้น
export async function GET() {
  const session = await auth();

  // ตรวจสอบว่า login หรือไม่
  if (!session?.user) {
    return NextResponse.json(
      { error: "ไม่ได้รับอนุญาต - กรุณา login" },
      { status: 401 }
    );
  }

  // ตรวจสอบว่าเป็น admin หรือไม่
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "ไม่ได้รับอนุญาต - ต้องเป็น Admin" },
      { status: 403 }
    );
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        emailVerified: true,
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      users,
      total: users.length,
    });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูล" },
      { status: 500 }
    );
  }
}

// อัปเดต role ของผู้ใช้
export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 403 });
  }

  try {
    const { userId, role } = await request.json();

    if (!userId || !role) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: "อัปเดต role สำเร็จ",
      user: updatedUser,
    });
  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปเดต" },
      { status: 500 }
    );
  }
}
