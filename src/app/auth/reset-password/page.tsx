import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "รีเซ็ตรหัสผ่าน",
  description: "รีเซ็ตรหัสผ่านของคุณ",
};

export default function ResetPasswordPage() {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            รีเซ็ตรหัสผ่าน
          </h1>
          <p className="text-sm text-muted-foreground">
            ใส่อีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
          </p>
        </div>
        <ResetPasswordForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/signin"
            className="hover:text-brand underline underline-offset-4"
          >
            กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
