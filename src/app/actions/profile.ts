"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema สำหรับอัปเดตโปรไฟล์ (ไม่มี email แล้ว)
const profileSchema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  // email ถูกลบออกจากการอัปเดตผ่าน Server Action นี้
});

// Schema สำหรับเปลี่ยน/ตั้งรหัสผ่าน
const passwordSchema = z
  .object({
    currentPassword: z.string().optional(), // ทำให้ optional
    newPassword: z.string().min(8, "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  })
  // เพิ่มเงื่อนไข: ถ้ามี currentPassword ต้องไม่ว่างเปล่า
  .refine(
    (data) => {
      if (data.currentPassword !== undefined && data.currentPassword !== null) {
        return data.currentPassword.length > 0;
      }
      return true; // ถ้าไม่มี currentPassword ก็ผ่าน
    },
    {
      message: "กรุณาใส่รหัสผ่านปัจจุบัน",
      path: ["currentPassword"],
    }
  );

type ProfileInput = z.infer<typeof profileSchema>;
type PasswordInput = z.infer<typeof passwordSchema>;

export async function updateProfileAction(values: ProfileInput) {
  const session = await auth();

  if (!session?.user) {
    return { error: "ไม่ได้รับอนุญาต!" };
  }

  const validatedFields = profileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง!" };
  }

  const { name } = validatedFields.data; // ดึงแค่ name

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name }, // อัปเดตแค่ name
    });

    revalidatePath("/profile");
    return { success: "อัปเดตข้อมูลสำเร็จ!" };
  } catch (error) {
    console.log("🚀 ~ updateProfileAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล!" };
  }
}

export async function changePasswordAction(values: PasswordInput) {
  const session = await auth();

  if (!session?.user) {
    return { error: "ไม่ได้รับอนุญาต!" };
  }

  const validatedFields = passwordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง!" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { error: "ไม่พบผู้ใช้!" };
  }

  // ตรวจสอบรหัสผ่านปัจจุบันเฉพาะเมื่อผู้ใช้มีรหัสผ่านอยู่แล้ว
  if (user.password) {
    if (!currentPassword) {
      return { error: "กรุณาใส่รหัสผ่านปัจจุบัน" };
    }
    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordsMatch) {
      return { error: "รหัสผ่านปัจจุบันไม่ถูกต้อง!" };
    }
  } else {
    // ถ้าผู้ใช้ไม่มีรหัสผ่าน (OAuth user) และพยายามใส่ currentPassword
    if (currentPassword) {
      return { error: "บัญชีนี้ไม่มีรหัสผ่านปัจจุบัน" };
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return { success: "เปลี่ยนรหัสผ่านสำเร็จ!" };
  } catch (error) {
    console.log("🚀 ~ changePasswordAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน!" };
  }
}

// Server Action สำหรับเปิด/ปิด Two-Factor Authentication
export async function toggleTwoFactorAction(enable: boolean) {
  const session = await auth();

  if (!session?.user) {
    return { error: "ไม่ได้รับอนุญาต!" };
  }

  // ตรวจสอบว่าผู้ใช้มีรหัสผ่านหรือไม่ ถ้าไม่มี จะเปิด 2FA ไม่ได้
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });

  if (!user?.password) {
    return {
      error:
        "ไม่สามารถเปิดใช้งาน 2FA ได้เนื่องจากบัญชีของคุณไม่มีรหัสผ่าน กรุณาตั้งรหัสผ่านก่อน",
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { isTwoFactorEnabled: enable },
    });

    revalidatePath("/profile"); // Revalidate เพื่ออัปเดต session
    return {
      success: `Two-Factor Authentication ถูก${enable ? "เปิด" : "ปิด"}ใช้งานแล้ว`,
    };
  } catch (error) {
    console.log("🚀 ~ toggleTwoFactorAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการอัปเดตการตั้งค่า 2FA!" };
  }
}
