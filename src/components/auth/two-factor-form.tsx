"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { verifyTwoFactorAction } from "@/app/actions/(auth)/auth";

const twoFactorSchema = z.object({
  code: z.string().min(6, "กรุณาใส่รหัส 6 หลัก").max(6, "กรุณาใส่รหัส 6 หลัก"),
});

type TwoFactorInput = z.infer<typeof twoFactorSchema>;

interface TwoFactorFormProps {
  email?: string;
  callbackUrl?: string;
}

export function TwoFactorForm({ email, callbackUrl }: TwoFactorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TwoFactorInput>({
    resolver: zodResolver(twoFactorSchema),
  });

  const onSubmit = (values: TwoFactorInput) => {
    setFormError(undefined);
    if (!email) {
      setFormError("ไม่พบอีเมลสำหรับยืนยัน 2FA");
      return;
    }

    startTransition(async () => {
      try {
        const result = await verifyTwoFactorAction(
          email,
          values.code,
          callbackUrl
        );

        if (result?.error) {
          toast.error("ยืนยัน 2FA ไม่สำเร็จ", {
            description: result.error,
          });
          setFormError(result.error);
          reset();
        } else if (result?.success) {
          toast.success("ยืนยัน 2FA สำเร็จ!", {
            description: result.success,
          });
          // การ redirect จะถูกจัดการโดย signIn function ใน verifyTwoFactorAction
          // หรือถ้าไม่มี callbackUrl จะไปที่ /dashboard
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.digest && error.digest.startsWith("NEXT_REDIRECT")) {
          // Next.js handles the redirect
        } else {
          console.error("Unexpected error during 2FA verification:", error);
          toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด", {
            description: "ไม่สามารถยืนยัน 2FA ได้ในขณะนี้",
          });
          setFormError("เกิดข้อผิดพลาดที่ไม่คาดคิด");
          reset();
        }
      }
    });
  };

  if (!email) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          ไม่พบอีเมลสำหรับยืนยัน Two-Factor Authentication
          กรุณากลับไปหน้าเข้าสู่ระบบ
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Mail className="h-4 w-4" />
        <AlertDescription>
          รหัสยืนยัน 6 หลักถูกส่งไปยังอีเมล{" "}
          <span className="font-semibold">{email}</span> แล้ว
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">รหัสยืนยัน</Label>
          <Input
            id="code"
            placeholder="XXXXXX"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoCapitalize="none"
            autoComplete="one-time-code"
            disabled={isPending}
            className="text-center text-xl tracking-widest"
            {...register("code")}
            maxLength={6}
          />
          {errors?.code && (
            <p className="text-xs text-red-600">{errors.code.message}</p>
          )}
        </div>

        {formError && (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              กำลังยืนยัน...
            </>
          ) : (
            "ยืนยันรหัส"
          )}
        </Button>
      </form>
    </div>
  );
}
