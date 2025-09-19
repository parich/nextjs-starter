import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "รีเซ็ตรหัสผ่าน",
  description: "รีเซ็ตรหัสผ่านของคุณ",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="สร้างบัญชีใหม่"
      subtitle="เริ่มต้นใช้งานด้วยการสร้างบัญชีฟรี"
      linkText="มีบัญชีแล้ว?"
      linkHref="/auth/signin"
      linkLabel="เข้าสู่ระบบ"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
