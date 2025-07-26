"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// แก้ไข createPostAction ให้รับ FormData
export async function createPostAction(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "กรุณา login ก่อนสร้างโพสต์" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/user");
    revalidatePath("/dashboard");

    return {
      success: "สร้างโพสต์สำเร็จ",
      post,
    };
  } catch (error) {
    console.log("🚀 ~ createPostAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการสร้างโพสต์" };
  }
}

// Server action สำหรับ moderator หรือ admin
export async function moderatePostAction(
  postId: string,
  action: "approve" | "reject"
) {
  const session = await auth();

  if (!session?.user) {
    return { error: "กรุณา login" };
  }

  // ตรวจสอบว่าเป็น moderator หรือ admin
  if (!["MODERATOR", "ADMIN"].includes(session.user.role)) {
    return { error: "ไม่ได้รับอนุญาต - ต้องเป็น Moderator หรือ Admin" };
  }

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        published: action === "approve",
      },
    });

    revalidatePath("/admin");

    return {
      success: `${action === "approve" ? "อนุมัติ" : "ปฏิเสธ"}โพสต์สำเร็จ`,
      post,
    };
  } catch (error) {
    console.log("🚀 ~ moderatePostAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการดำเนินการ" };
  }
}

// เพิ่ม Server Action สำหรับการสร้างโพสต์แบบง่าย
export async function createTestPostAction() {
  const session = await auth();

  if (!session?.user) {
    return { error: "กรุณา login ก่อนสร้างโพสต์" };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: `โพสต์ทดสอบ - ${new Date().toLocaleString("th-TH")}`,
        content: `นี่คือโพสต์ทดสอบที่สร้างโดย ${
          session.user.name || session.user.email
        } เมื่อ ${new Date().toLocaleString("th-TH")}`,
        authorId: session.user.id,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/user");
    revalidatePath("/dashboard");
    revalidatePath("/test-protection");

    return {
      success: "สร้างโพสต์ทดสอบสำเร็จ",
      post,
    };
  } catch (error) {
    console.log("🚀 ~ createTestPostAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการสร้างโพสต์" };
  }
}
