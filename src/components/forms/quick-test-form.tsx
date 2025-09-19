"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createTestPostAction } from "@/app/actions/(auth)/user";
import { Loader2, Zap } from "lucide-react";

export function QuickTestForm() {
  const [isPending, startTransition] = useTransition();

  const handleQuickTest = () => {
    startTransition(async () => {
      try {
        const result = await createTestPostAction();

        if (result.error) {
          toast.error("เกิดข้อผิดพลาด", {
            description: result.error,
          });
        } else if (result.success) {
          toast.success("สำเร็จ!", {
            description: result.success,
          });
        }
      } catch (error) {
        console.log("🚀 ~ handleQuickTest ~ error:", error);
        toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ทดสอบ Server Action - แบบง่าย</CardTitle>
        <CardDescription>
          สร้างโพสต์ทดสอบด้วยข้อมูลอัตโนมัติ (ต้อง login)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleQuickTest}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              กำลังสร้างโพสต์ทดสอบ...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              สร้างโพสต์ทดสอบ
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
