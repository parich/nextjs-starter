"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch"; // Import Switch
import {
  updateProfileAction,
  changePasswordAction,
  toggleTwoFactorAction,
} from "@/app/actions/(auth)/profile"; // Import new action
import { z } from "zod";

// Schema สำหรับอัปเดตโปรไฟล์ (ไม่มี email แล้ว)
const profileSchema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  // email ถูกลบออกจากการอัปเดตผ่านฟอร์มนี้
});

// Schema สำหรับเปลี่ยน/ตั้งรหัสผ่าน
const passwordSchema = z
  .object({
    currentPassword: z.string().optional(), // ทำให้ optional
    newPassword: z.string().min(8, "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  })
  // เพิ่มเงื่อนไข: ถ้ามี currentPassword ต้องไม่ว่างเปล่า
  .refine(
    (data) => {
      if (data.currentPassword !== undefined && data.currentPassword !== null) {
        return data.currentPassword.length > 0;
      }
      return true; // ถ้าไม่มี currentPassword ก็ผ่าน
    },
    {
      message: "กรุณาใส่รหัสผ่านปัจจุบัน",
      path: ["currentPassword"],
    }
  );

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
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user.isTwoFactorEnabled
  ); // State สำหรับ 2FA toggle
  const [isProfilePending, startProfileTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();
  const [isTwoFactorPending, startTwoFactorTransition] = useTransition();

  const profileForm = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      // email: user.email, // ลบ email ออกจาก defaultValues
    },
  });

  const passwordForm = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
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

  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked); // อัปเดต UI ทันที
    startTwoFactorTransition(async () => {
      const result = await toggleTwoFactorAction(checked);
      if (result?.error) {
        toast.error("เกิดข้อผิดพลาด", { description: result.error });
        setTwoFactorEnabled(!checked); // ย้อนกลับ UI ถ้ามีข้อผิดพลาด
      } else if (result?.success) {
        toast.success("สำเร็จ!", { description: result.success });
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Profile Information Form */}
      <div>
        <h3 className="text-lg font-medium">ข้อมูลส่วนตัว</h3>
        <p className="text-sm text-muted-foreground mb-4">
          อัปเดตชื่อของคุณ (อีเมลไม่สามารถเปลี่ยนแปลงได้)
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
                disabled // ทำให้ช่องอีเมล disabled
                value={user.email} // แสดงอีเมลปัจจุบัน
              />
              <p className="px-1 text-xs text-muted-foreground">
                อีเมลไม่สามารถเปลี่ยนแปลงได้
              </p>
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
        <h3 className="text-lg font-medium">
          {user.password ? "เปลี่ยนรหัสผ่าน" : "ตั้งรหัสผ่าน"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {user.password
            ? "อัปเดตรหัสผ่านเพื่อความปลอดภัยของบัญชี"
            : "ตั้งรหัสผ่านสำหรับบัญชีของคุณ"}
        </p>

        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <div className="grid gap-4">
            {user.password && ( // แสดงช่องรหัสผ่านปัจจุบันเฉพาะเมื่อมีรหัสผ่านอยู่แล้ว
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
            )}

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
            {isPasswordPending
              ? "กำลังเปลี่ยน..."
              : user.password
                ? "เปลี่ยนรหัสผ่าน"
                : "ตั้งรหัสผ่าน"}
          </Button>
        </form>
      </div>

      <Separator />

      {/* Two-Factor Authentication Section */}
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          เพิ่มความปลอดภัยให้กับบัญชีของคุณด้วย 2FA ผ่านอีเมล
        </p>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium leading-none">เปิดใช้งาน 2FA</p>
            <p className="text-sm text-muted-foreground">
              เมื่อเปิดใช้งาน
              คุณจะต้องป้อนรหัสยืนยันที่ส่งไปยังอีเมลของคุณเมื่อเข้าสู่ระบบ
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={handleTwoFactorToggle}
            disabled={isTwoFactorPending}
          />
        </div>
        {isTwoFactorPending && (
          <p className="text-sm text-muted-foreground mt-2 flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            กำลังอัปเดตการตั้งค่า 2FA...
          </p>
        )}
      </div>
    </div>
  );
}
