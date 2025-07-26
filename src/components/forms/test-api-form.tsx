"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { testApiSchema, type TestApiInput } from "@/lib/validations/post";
import { useRole } from "@/components/auth/role-guard";
import { Loader2, Send } from "lucide-react";

export function TestApiForm() {
  const [isPending, startTransition] = useTransition();
  const { isAuthenticated, isAdmin } = useRole();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestApiInput>({
    resolver: zodResolver(testApiSchema),
    defaultValues: {
      message: "",
    },
  });

  const testProtectedAPI = async (data: TestApiInput) => {
    try {
      const response = await fetch("/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("API Error", {
          description: result.error || "เกิดข้อผิดพลาด",
        });
      } else {
        toast.success("Protected API สำเร็จ!", {
          description: result.message,
        });
        reset();
      }
    } catch (error) {
      console.log("🚀 ~ testProtectedAPI ~ error:", error);
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  const testAdminAPI = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const result = await response.json();

      if (!response.ok) {
        toast.error("Admin API Error", {
          description: result.error || "เกิดข้อผิดพลาด",
        });
      } else {
        toast.success("Admin API สำเร็จ!", {
          description: `พบผู้ใช้ ${result.total} คน`,
        });
      }
    } catch (error) {
      console.log("🚀 ~ testAdminAPI ~ error:", error);
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  const onSubmit = (values: TestApiInput) => {
    startTransition(async () => {
      await testProtectedAPI(values);
    });
  };

  const handleAdminTest = () => {
    startTransition(async () => {
      await testAdminAPI();
    });
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ทดสอบ API Protection</CardTitle>
          <CardDescription>กรุณา login เพื่อทดสอบ API</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ทดสอบ API Protection</CardTitle>
        <CardDescription>
          ทดสอบการเรียก API ที่มีการป้องกัน (ใช้ Zod validation)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">ข้อความทดสอบ</Label>
            <Input
              id="message"
              placeholder="ใส่ข้อความเพื่อส่งไป Protected API (1-200 ตัวอักษร)"
              disabled={isPending}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              ทดสอบ Protected API
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isPending || !isAdmin()}
              onClick={handleAdminTest}
              className="flex-1"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              ทดสอบ Admin API
              {!isAdmin() && " (ต้องเป็น Admin)"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
