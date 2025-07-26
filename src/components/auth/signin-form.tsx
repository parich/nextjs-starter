"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { signInAction } from "@/app/actions/auth";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginInput) => {
    setError("");

    startTransition(() => {
      signInAction(values).then((data) => {
        setError(data?.error);
      });
    });
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
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
                autoComplete="current-password"
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
          <div className="flex items-center justify-end">
            <Link
              href="/auth/reset-password"
              className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button disabled={isPending}>
            {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
