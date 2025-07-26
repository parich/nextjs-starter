import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description: "สร้างบัญชีใหม่",
};

export default function SignUpPage() {
  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">สมัครสมาชิก</h1>
          <p className="text-sm text-muted-foreground">
            กรอกข้อมูลเพื่อสร้างบัญชีใหม่
          </p>
        </div>
        <SignUpForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/signin"
            className="hover:text-brand underline underline-offset-4"
          >
            มีบัญชีแล้ว? เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
