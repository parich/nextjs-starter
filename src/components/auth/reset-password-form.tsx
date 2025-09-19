"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validations/auth";
import { resetPasswordAction } from "@/app/actions/(auth)/auth";
import { SuccessAlert } from "../alerts/success-alert";
import { DestructiveAlert } from "../alerts/destructive-alert";

export function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (values: ResetPasswordInput) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPasswordAction(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
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
              <DestructiveAlert
                title="อีเมลไม่ถูกต้อง"
                message={errors.email.message || "กรุณากรอกอีเมลให้ถูกต้อง"}
              />
            )}
          </div>
          {error && <DestructiveAlert message={error} />}
          {success && <SuccessAlert message={success} />}
          <Button disabled={isPending || !!success}>
            {isPending ? "กำลังส่งอีเมล..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
          </Button>
        </div>
      </form>
    </div>
  );
}
