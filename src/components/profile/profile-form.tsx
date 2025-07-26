"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  updateProfileAction,
  changePasswordAction,
} from "@/app/actions/profile";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("กรุณาใส่อีเมลที่ถูกต้อง"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "กรุณาใส่รหัสผ่านปัจจุบัน"),
    newPassword: z.string().min(8, "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

type ProfileInput = z.infer<typeof profileSchema>;
type PasswordInput = z.infer<typeof passwordSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileError, setProfileError] = useState<string | undefined>("");
  const [profileSuccess, setProfileSuccess] = useState<string | undefined>("");
  const [passwordError, setPasswordError] = useState<string | undefined>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string | undefined>(
    ""
  );
  const [isProfilePending, startProfileTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
    },
  });

  const passwordForm = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (values: ProfileInput) => {
    setProfileError("");
    setProfileSuccess("");

    startProfileTransition(() => {
      updateProfileAction(values).then((data) => {
        setProfileError(data?.error);
        setProfileSuccess(data?.success);
      });
    });
  };

  const onPasswordSubmit = (values: PasswordInput) => {
    setPasswordError("");
    setPasswordSuccess("");

    startPasswordTransition(() => {
      changePasswordAction(values).then((data) => {
        setPasswordError(data?.error);
        setPasswordSuccess(data?.success);
        if (data?.success) {
          passwordForm.reset();
        }
      });
    });
  };

  return (
    <div className="space-y-8">
      {/* Profile Information Form */}
      <div>
        <h3 className="text-lg font-medium">ข้อมูลส่วนตัว</h3>
        <p className="text-sm text-muted-foreground mb-4">
          อัปเดตชื่อและอีเมลของคุณ
        </p>

        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="name">ชื่อ</Label>
              <Input
                id="name"
                placeholder="ชื่อของคุณ"
                disabled={isProfilePending}
                {...profileForm.register("name")}
              />
              {profileForm.formState.errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                disabled={isProfilePending}
                {...profileForm.register("email")}
              />
              {profileForm.formState.errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {profileForm.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          {profileError && (
            <Alert variant="destructive">
              <AlertDescription>{profileError}</AlertDescription>
            </Alert>
          )}
          {profileSuccess && (
            <Alert>
              <AlertDescription>{profileSuccess}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isProfilePending}
            className="w-full sm:w-auto"
          >
            {isProfilePending ? "กำลังอัปเดต..." : "อัปเดตข้อมูล"}
          </Button>
        </form>
      </div>

      <Separator />

      {/* Change Password Form */}
      <div>
        <h3 className="text-lg font-medium">เปลี่ยนรหัสผ่าน</h3>
        <p className="text-sm text-muted-foreground mb-4">
          อัปเดตรหัสผ่านเพื่อความปลอดภัยของบัญชี
        </p>

        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="currentPassword">รหัสผ่านปัจจุบัน</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  placeholder="รหัสผ่านปัจจุบัน"
                  type={showCurrentPassword ? "text" : "password"}
                  disabled={isPasswordPending}
                  {...passwordForm.register("currentPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  disabled={isPasswordPending}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordForm.formState.errors?.currentPassword && (
                <p className="px-1 text-xs text-red-600">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1">
                <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    placeholder="รหัสผ่านใหม่"
                    type={showNewPassword ? "text" : "password"}
                    disabled={isPasswordPending}
                    {...passwordForm.register("newPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    disabled={isPasswordPending}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordForm.formState.errors?.newPassword && (
                  <p className="px-1 text-xs text-red-600">
                    {passwordForm.formState.errors.newPassword.message}
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
                    disabled={isPasswordPending}
                    {...passwordForm.register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    disabled={isPasswordPending}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordForm.formState.errors?.confirmPassword && (
                  <p className="px-1 text-xs text-red-600">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {passwordError && (
            <Alert variant="destructive">
              <AlertDescription>{passwordError}</AlertDescription>
            </Alert>
          )}
          {passwordSuccess && (
            <Alert>
              <AlertDescription>{passwordSuccess}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isPasswordPending}
            className="w-full sm:w-auto"
          >
            {isPasswordPending ? "กำลังเปลี่ยน..." : "เปลี่ยนรหัสผ่าน"}
          </Button>
        </form>
      </div>
    </div>
  );
}
