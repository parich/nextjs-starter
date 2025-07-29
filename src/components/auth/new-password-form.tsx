"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  newPasswordSchema,
  type NewPasswordInput,
} from "@/lib/validations/auth";
import { newPasswordAction } from "@/app/actions/auth";
import { SuccessAlert } from "../alerts/success-alert";
import { DestructiveAlert } from "../alerts/destructive-alert";

interface NewPasswordFormProps {
  token?: string;
}

export function NewPasswordForm({ token }: NewPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (values: NewPasswordInput) => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("ไม่พบ token!");
      return;
    }

    startTransition(() => {
      newPasswordAction(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  if (!token) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Token ไม่ถูกต้องหรือหมดอายุ!</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="password">รหัสผ่านใหม่</Label>
            <div className="relative py-4">
              <Input
                id="password"
                placeholder="รหัสผ่านใหม่"
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
            <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                placeholder="ยืนยันรหัสผ่านใหม่"
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
          {error && <DestructiveAlert message={error} />}
          {success && <SuccessAlert message={success} />}
          <Button disabled={isPending}>
            {isPending ? "กำลังอัปเดต..." : "อัปเดตรหัสผ่าน"}
          </Button>
        </div>
      </form>
    </div>
  );
}
