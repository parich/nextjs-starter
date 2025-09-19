import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/signin-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ",
  description: "เข้าสู่ระบบเพื่อใช้งาน",
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="ยินดีต้อนรับกลับ"
      subtitle="เข้าสู่ระบบเพื่อเข้าถึงบัญชีของคุณ"
      linkText="ยังไม่มีบัญชี?"
      linkHref="/auth/signup"
      linkLabel="สมัครสมาชิก"
    >
      <SignInForm />
    </AuthLayout>
  );
}
