import type { Metadata } from "next";
import { TwoFactorForm } from "@/components/auth/two-factor-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "ยืนยัน Two-Factor",
  description: "ป้อนรหัสยืนยัน Two-Factor Authentication",
};

interface TwoFactorPageProps {
  searchParams: Promise<{
    email?: string;
    callbackUrl?: string;
  }>; // เปลี่ยนเป็น Promise
}

export default async function TwoFactorPage({
  searchParams: searchParamsPromise,
}: TwoFactorPageProps) {
  // ต้อง await searchParams ก่อนใช้งาน
  const searchParams = await searchParamsPromise;
  const email = searchParams.email;
  const callbackUrl = searchParams.callbackUrl;

  return (
    <AuthLayout
      title="ยืนยัน Two-Factor"
      subtitle="รหัสยืนยันถูกส่งไปยังอีเมลของคุณแล้ว"
      linkText="กลับไป"
      linkHref="/auth/signin"
      linkLabel="หน้าเข้าสู่ระบบ"
    >
      <TwoFactorForm email={email} callbackUrl={callbackUrl} />
    </AuthLayout>
  );
}
