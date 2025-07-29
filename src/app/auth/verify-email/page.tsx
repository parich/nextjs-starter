import type { Metadata } from "next";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "ยืนยันอีเมล",
  description: "ยืนยันอีเมลของคุณ",
};

interface VerifyEmailPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function VerifyEmailPage({
  searchParams: searchParamsPromise,
}: VerifyEmailPageProps) {
  const searchParams = await searchParamsPromise;
  const token = searchParams.token;

  return (
    <AuthLayout
      title="ยืนยันอีเมล"
      subtitle="กรุณายืนยันอีเมลเพื่อเปิดใช้งานบัญชี"
      linkText="กลับไป"
      linkHref="/auth/signin"
      linkLabel="หน้าเข้าสู่ระบบ"
    >
      <VerifyEmailForm token={token} />
    </AuthLayout>
  );
}
