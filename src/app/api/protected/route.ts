import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// API route ที่ต้อง login
export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "ไม่ได้รับอนุญาต - กรุณา login" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "เข้าถึงข้อมูลสำเร็จ",
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
    },
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "ไม่ได้รับอนุญาต - กรุณา login" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // ประมวลผลข้อมูล
    return NextResponse.json({
      message: "บันทึกข้อมูลสำเร็จ",
      data: body,
      userId: session.user.id,
    });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }
}
