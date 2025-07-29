import type { Metadata } from "next";
import Link from "next/link";
import { NewPasswordForm } from "@/components/auth/new-password-form";

export const metadata: Metadata = {
  title: "ตั้งรหัสผ่านใหม่",
  description: "ตั้งรหัสผ่านใหม่ของคุณ",
};

type NewPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function NewPasswordPage({
  searchParams,
}: NewPasswordPageProps) {
  const token = await searchParams.then((params) => params.token);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-8">
      <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            ตั้งรหัสผ่านใหม่
          </h1>
          <p className="text-sm text-muted-foreground">
            กรอกรหัสผ่านใหม่ของคุณ
          </p>
        </div>
        <NewPasswordForm token={token} />
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
