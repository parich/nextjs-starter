"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { signInAction } from "@/app/actions/(auth)/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginInput) => {
    setFormError(undefined);
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    startTransition(async () => {
      try {
        const result = await signInAction(values, callbackUrl);
        if (result?.error) {
          toast.error("เข้าสู่ระบบไม่สำเร็จ", {
            description: result.error,
          });
          setFormError(result.error);
          reset();
        } else if (result?.type === "twoFactorRequired") {
          router.push(
            `/auth/two-factor?email=${encodeURIComponent(result.email!)}&callbackUrl=${encodeURIComponent(callbackUrl)}`
          );
        }
      } catch (error: unknown) {
        // เปลี่ยน 'any' เป็น 'unknown'
        // ตรวจสอบว่าเป็น NEXT_REDIRECT error ที่ Next.js จัดการเองหรือไม่
        if (
          error &&
          typeof error === "object" &&
          "digest" in error &&
          typeof error.digest === "string" &&
          error.digest.startsWith("NEXT_REDIRECT")
        ) {
          // นี่คือ error การ redirect ที่คาดหวังจาก NextAuth.js
          // ปล่อยให้ Next.js จัดการต่อ ไม่ต้องทำอะไรที่นี่
        } else {
          console.error("Unexpected error during sign-in transition:", error);
          toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด", {
            description: "ไม่สามารถเข้าสู่ระบบได้ในขณะนี้",
          });
          setFormError("เกิดข้อผิดพลาดที่ไม่คาดคิด");
          reset();
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* OAuth Buttons */}
      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            หรือเข้าสู่ระบบด้วย
          </span>
        </div>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">อีเมล</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              className="pl-10"
              {...register("email")}
            />
          </div>
          {errors?.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              placeholder="รหัสผ่าน"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isPending}
              className="pl-10 pr-10"
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isPending}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors?.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Button asChild variant="link" className="px-0 font-normal">
            <a href="/auth/reset-password">ลืมรหัสผ่าน?</a>
          </Button>
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
              กำลังเข้าสู่ระบบ...
            </>
          ) : (
            "เข้าสู่ระบบ"
          )}
        </Button>
      </form>
    </div>
  );
}
