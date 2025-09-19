"use server";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
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
  generateVerificationToken,
  getVerificationTokenByToken,
} from "@/lib/tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
}

export async function signInAction(values: LoginInput, callbackUrl?: string) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/dashboard",
    });
    return { success: "เข้าสู่ระบบสำเร็จ!" };
  } catch (error: unknown) {
    // ตรวจสอบ NEXT_REDIRECT error ก่อน (สำหรับการ redirect ที่สำเร็จ)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      // ปล่อยให้ Next.js จัดการ redirect
      throw error;
    }

    // ตรวจสอบ CallbackRouteError จาก NextAuth v5
    if (error && typeof error === "object" && "type" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authError = error as any;

      // ถ้าเป็น CallbackRouteError ให้ดู cause
      if (authError.type === "CallbackRouteError" && authError.cause?.err) {
        const originalError = authError.cause.err;
        const errorMessage = originalError.message || "";

        if (errorMessage.includes("CredentialsSignin")) {
          return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
        }

        if (errorMessage.includes("EmailNotVerified")) {
          return {
            error:
              "บัญชีของคุณยังไม่ได้รับการยืนยัน กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีของคุณ",
          };
        }

        if (errorMessage.includes("TwoFactorRequired")) {
          return { type: "twoFactorRequired", email };
        }

        if (errorMessage.includes("InvalidTwoFactorCode")) {
          return { error: "รหัสยืนยัน 2FA ไม่ถูกต้อง" };
        }

        if (errorMessage.includes("TwoFactorCodeExpired")) {
          return { error: "รหัสยืนยัน 2FA หมดอายุแล้ว" };
        }
      }
    }

    // Log เฉพาะใน development mode
    if (process.env.NODE_ENV === "development") {
      console.error("Unexpected error in signInAction:", error);
    }

    return { error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" };
  }
}

// Server Action สำหรับยืนยัน Two-Factor Code
export async function verifyTwoFactorAction(
  email: string,
  code: string,
  callbackUrl?: string
) {
  if (!email || !code) {
    return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    await signIn("credentials", {
      email,
      twoFactorCode: code,
      redirect: true,
      redirectTo: callbackUrl || "/dashboard",
    });
    return { success: "ยืนยัน 2FA สำเร็จ!" };
  } catch (error: unknown) {
    // เพิ่ม debug logs
    console.log("🚀 ~ verifyTwoFactorAction ~ error:", error);
    console.log("🚀 ~ error type:", typeof error);
    console.log(
      "🚀 ~ error keys:",
      error && typeof error === "object" ? Object.keys(error) : "not object"
    );

    // ลอง log cause property โดยตรง
    if (error && typeof error === "object" && "cause" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("🚀 ~ error.cause:", (error as any).cause);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("🚀 ~ error.cause.err:", (error as any).cause?.err);
      console.log(
        "🚀 ~ error.cause.err.message:",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).cause?.err?.message
      );
    }

    // ตรวจสอบ NEXT_REDIRECT error ก่อน
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    // ตรวจสอบ CallbackRouteError จาก NextAuth v5
    if (error && typeof error === "object" && "type" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authError = error as any;

      console.log("🚀 ~ authError.type:", authError.type);
      console.log("🚀 ~ authError.cause:", authError.cause);

      // ถ้าเป็น CallbackRouteError ให้ดู cause
      if (authError.type === "CallbackRouteError" && authError.cause?.err) {
        const originalError = authError.cause.err;
        console.log("🚀 ~ originalError:", originalError);
        console.log("🚀 ~ originalError.message:", originalError.message);

        const errorMessage = originalError.message || "";

        if (errorMessage.includes("InvalidTwoFactorCode")) {
          return { error: "รหัสยืนยัน 2FA ไม่ถูกต้อง" };
        }

        if (errorMessage.includes("TwoFactorCodeExpired")) {
          return { error: "รหัสยืนยัน 2FA หมดอายุแล้ว" };
        }

        if (errorMessage.includes("CredentialsSignin")) {
          return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
        }

        if (errorMessage.includes("EmailNotVerified")) {
          return { error: "บัญชีของคุณยังไม่ได้รับการยืนยัน" };
        }
      }
    }

    console.error("Unexpected error in verifyTwoFactorAction:", error);
    return { error: "เกิดข้อผิดพลาดในการยืนยัน 2FA" };
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

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );

    return { success: "สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี" };
  } catch (error) {
    console.log("🚀 ~ signUpAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการสมัครสมาชิก!" };
  }
}

export async function verifyEmailAction(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token ไม่ถูกต้อง!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token หมดอายุแล้ว!" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.identifier },
  });

  if (!existingUser) {
    return { error: "ไม่พบอีเมลนี้ในระบบ!" };
  }

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.identifier,
      },
    });

    await prisma.verificationToken.delete({
      where: { token: existingToken.token },
    });

    return { success: "ยืนยันอีเมลสำเร็จ! ตอนนี้คุณสามารถเข้าสู่ระบบได้แล้ว" };
  } catch (error) {
    console.log("🚀 ~ verifyEmailAction ~ error:", error);
    return { error: "เกิดข้อผิดพลาดในการยืนยันอีเมล!" };
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
