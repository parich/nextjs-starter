"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { signUpAction } from "@/app/actions/auth";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterInput) => {
    startTransition(async () => {
      try {
        const result = await signUpAction(values);

        if (result.error) {
          toast.error("สมัครสมาชิกไม่สำเร็จ", {
            description: result.error,
          });
        } else if (result.success) {
          toast.success("สมัครสมาชิกสำเร็จ!", {
            description: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี",
          });
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
        toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
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
            หรือสมัครด้วย
          </span>
        </div>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">ชื่อ</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="ชื่อของคุณ"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isPending}
              className="pl-10"
              {...register("name")}
            />
          </div>
          {errors?.name && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

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
              autoComplete="new-password"
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              type={showConfirmPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isPending}
              className="pl-10 pr-10"
              {...register("confirmPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              disabled={isPending}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors?.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              กำลังสมัครสมาชิก...
            </>
          ) : (
            "สมัครสมาชิก"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          การสมัครสมาชิกแสดงว่าคุณยอมรับ{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            เงื่อนไขการใช้งาน
          </a>{" "}
          และ{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            นโยบายความเป็นส่วนตัว
          </a>
        </p>
      </form>
    </div>
  );
}
