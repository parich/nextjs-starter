"use server";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  type LoginInput,
  type RegisterInput,
  type ResetPasswordInput,
  newPasswordSchema,
  type NewPasswordInput,
} from "@/lib/validations/auth";
import {
  generatePasswordResetToken,
  getPasswordResetTokenByToken,
} from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function signInAction(values: LoginInput) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง!" };
        default:
          return { error: "เกิดข้อผิดพลาด!" };
      }
    }

    throw error;
  }
}

export async function signUpAction(values: RegisterInput) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "อีเมลนี้ถูกใช้งานแล้ว!" };
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ" };
  } catch (error) {
    console.log("🚀 ~ signUpAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการสมัครสมาชิก!" };
  }
}

export async function resetPasswordAction(values: ResetPasswordInput) {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "อีเมลไม่ถูกต้อง!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "ไม่พบอีเมลนี้ในระบบ!" };
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return { success: "ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว!" };
  } catch (error) {
    console.log("🚀 ~ resetPasswordAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการส่งอีเมล!" };
  }
}

export async function newPasswordAction(
  values: NewPasswordInput,
  token: string
) {
  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token ไม่ถูกต้อง!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token หมดอายุแล้ว!" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return { error: "ไม่พบอีเมลนี้ในระบบ!" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "รหัสผ่านถูกอัปเดตแล้ว!" };
  } catch (error) {
    console.log("🚀 ~ newPasswordAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการอัปเดตรหัสผ่าน!" };
  }
}
