"use client";

import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPageClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "เกิดข้อผิดพลาดที่ไม่รู้จัก";
  let errorTitle = "เกิดข้อผิดพลาด";

  useEffect(() => {
    console.log("error param:", error);
    console.log("all params:", Object.fromEntries(searchParams.entries()));
  }, [error, searchParams]);

  switch (error) {
    case "AccessDenied":
      errorMessage =
        "บัญชีของคุณยังไม่ได้รับการยืนยัน กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีของคุณ";
      errorTitle = "ยังไม่ได้ยืนยันอีเมล";
      break;
    case "OAuthAccountNotLinked":
      errorMessage =
        "อีเมลนี้ถูกใช้โดยบัญชีอื่นแล้ว กรุณาเข้าสู่ระบบด้วยบัญชีเดิม";
      errorTitle = "บัญชีถูกเชื่อมโยงแล้ว";
      break;
    case "CallbackRouteError":
      errorMessage = "เกิดข้อผิดพลาดในการเรียกกลับ กรุณาลองใหม่อีกครั้ง";
      errorTitle = "ข้อผิดพลาดในการเชื่อมต่อ";
      break;
    case "Configuration":
      errorMessage = "เกิดข้อผิดพลาดในการตั้งค่าระบบ กรุณาติดต่อผู้ดูแล";
      errorTitle = "ข้อผิดพลาดในการตั้งค่า";
      break;
    case "CredentialsSignin":
      errorMessage = "อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบข้อมูลของคุณ";
      errorTitle = "เข้าสู่ระบบไม่สำเร็จ";
      break;
    case "TwoFactorRequired":
      errorMessage =
        "ต้องมีการยืนยัน Two-Factor Authentication กรุณาป้อนรหัสยืนยัน";
      errorTitle = "ต้องยืนยัน 2FA";
      break;
    case "InvalidTwoFactorCode":
      errorMessage = "รหัสยืนยัน Two-Factor Authentication ไม่ถูกต้อง";
      errorTitle = "รหัส 2FA ไม่ถูกต้อง";
      break;
    case "TwoFactorCodeExpired":
      errorMessage =
        "รหัสยืนยัน Two-Factor Authentication หมดอายุแล้ว กรุณาลองเข้าสู่ระบบใหม่";
      errorTitle = "รหัส 2FA หมดอายุ";
      break;
    default:
      errorMessage = "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง";
      errorTitle = "เกิดข้อผิดพลาด";
      break;
  }

  return (
    <AuthLayout
      title="เกิดข้อผิดพลาด"
      subtitle="ไม่สามารถดำเนินการได้"
      linkText="กลับไป"
      linkHref="/auth/signin"
      linkLabel="หน้าเข้าสู่ระบบ"
    >
      <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <div className="mt-4 text-center">
        <Button asChild>
          <Link href="/auth/signin">กลับไปหน้าเข้าสู่ระบบ</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
