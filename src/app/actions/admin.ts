"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Role } from "@prisma/client";

// Server action สำหรับ admin เท่านั้น
export async function updateUserRoleAction(userId: string, newRole: Role) {
  const session = await auth();

  // ตรวจสอบว่า login และเป็น admin
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "ไม่ได้รับอนุญาต - ต้องเป็น Admin" };
  }

  // ป้องกันไม่ให้แก้ไข role ของตัวเอง
  if (session.user.id === userId) {
    return { error: "ไม่สามารถแก้ไข role ของตัวเองได้" };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    revalidatePath("/admin");
    return {
      success: "อัปเดต role สำเร็จ",
      user: updatedUser,
    };
  } catch (error) {
    console.log("🚀 ~ updateUserRoleAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการอัปเดต role" };
  }
}

// ลบผู้ใช้ (admin เท่านั้น)
export async function deleteUserAction(userId: string) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "ไม่ได้รับอนุญาต - ต้องเป็น Admin" };
  }

  // ป้องกันไม่ให้ลบตัวเอง
  if (session.user.id === userId) {
    return { error: "ไม่สามารถลบบัญชีของตัวเองได้" };
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin");
    return { success: "ลบผู้ใช้สำเร็จ" };
  } catch (error) {
    console.log("🚀 ~ deleteUserAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการลบผู้ใช้" };
  }
}
