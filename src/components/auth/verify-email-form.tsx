"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { verifyEmailAction } from "@/app/actions/auth";

interface VerifyEmailFormProps {
  token?: string;
}

export function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "missing"
  >("loading");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) {
      setStatus("missing");
      setMessage("ไม่พบ token การยืนยัน");
      return;
    }

    startTransition(async () => {
      try {
        const result = await verifyEmailAction(token);

        if (result.error) {
          setStatus("error");
          setMessage(result.error);
          toast.error("ยืนยันอีเมลไม่สำเร็จ", {
            description: result.error,
          });
        } else if (result.success) {
          setStatus("success");
          setMessage(result.success);
          toast.success("ยืนยันอีเมลสำเร็จ!", {
            description: result.success,
          });
        }
      } catch (error) {
        console.log("🚀 ~ VerifyEmailForm ~ error:", error);
        setStatus("error");
        setMessage("เกิดข้อผิดพลาดที่ไม่คาดคิด");
        toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    });
  }, [token]);

  if (status === "loading" || isPending) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
          <CardTitle>กำลังยืนยันอีเมล</CardTitle>
          <CardDescription>กรุณารอสักครู่...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === "success") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">ยืนยันอีเมลสำเร็จ!</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild className="w-full">
            <a href="/auth/signin">เข้าสู่ระบบ</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (status === "error" || status === "missing") {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-red-600">ยืนยันอีเมลไม่สำเร็จ</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              หากคุณยังไม่ได้รับอีเมลยืนยัน กรุณาตรวจสอบโฟลเดอร์ spam
              หรือลองสมัครสมาชิกใหม่อีกครั้ง
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full bg-transparent">
              <a href="/auth/signup">สมัครสมาชิกใหม่</a>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <a href="/auth/signin">กลับไปหน้าเข้าสู่ระบบ</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
