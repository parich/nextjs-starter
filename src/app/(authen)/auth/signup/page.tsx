import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/signup-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description: "สร้างบัญชีใหม่",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="สร้างบัญชีใหม่"
      subtitle="เริ่มต้นใช้งานด้วยการสร้างบัญชีฟรี"
      linkText="มีบัญชีแล้ว?"
      linkHref="/auth/signin"
      linkLabel="เข้าสู่ระบบ"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
