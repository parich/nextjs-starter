import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ",
  description: "เข้าสู่ระบบเพื่อใช้งาน",
};

export default function SignInPage() {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">เข้าสู่ระบบ</h1>
          <p className="text-sm text-muted-foreground">
            ใส่อีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
          </p>
        </div>
        <SignInForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/signup"
            className="hover:text-brand underline underline-offset-4"
          >
            ยังไม่มีบัญชี? สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}
