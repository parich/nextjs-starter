"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("กรุณาใส่อีเมลที่ถูกต้อง"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "กรุณาใส่รหัสผ่านปัจจุบัน"),
    newPassword: z.string().min(8, "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

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

  const { name, email } = validatedFields.data;

  // ตรวจสอบว่าอีเมลใหม่ถูกใช้โดยผู้ใช้คนอื่นหรือไม่
  if (email !== session.user.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return { error: "อีเมลนี้ถูกใช้งานแล้ว!" };
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
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

  if (!user || !user.password) {
    return { error: "ไม่พบผู้ใช้!" };
  }

  const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordsMatch) {
    return { error: "รหัสผ่านปัจจุบันไม่ถูกต้อง!" };
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
