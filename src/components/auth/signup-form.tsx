"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { signUpAction } from "@/app/actions/auth";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterInput) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signUpAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="name">ชื่อ</Label>
            <Input
              id="name"
              placeholder="ชื่อของคุณ"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isPending}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="รหัสผ่าน"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isPending}
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
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                placeholder="ยืนยันรหัสผ่าน"
                type={showConfirmPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isPending}
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
              <p className="px-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Button disabled={isPending}>
            {isPending ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
          </Button>
        </div>
      </form>
    </div>
  );
}
