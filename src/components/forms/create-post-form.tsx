"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPostSchema, type CreatePostInput } from "@/lib/validations/post";
import { createPostAction } from "@/app/actions/(auth)/user";
import { Loader2 } from "lucide-react";

export function CreatePostForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: CreatePostInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);

        const result = await createPostAction(formData);

        if (result.error) {
          toast.error("เกิดข้อผิดพลาด", {
            description: result.error,
          });
        } else if (result.success) {
          toast.success("สำเร็จ!", {
            description: result.success,
          });
          reset();
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
        toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>สร้างโพสต์ใหม่</CardTitle>
        <CardDescription>
          กรอกข้อมูลเพื่อสร้างโพสต์ (ใช้ Zod validation)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">หัวข้อ</Label>
            <Input
              id="title"
              placeholder="หัวข้อโพสต์ (3-100 ตัวอักษร)"
              disabled={isPending}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">เนื้อหา</Label>
            <Textarea
              id="content"
              placeholder="เขียนเนื้อหาโพสต์ที่นี่... (10-1000 ตัวอักษร)"
              rows={4}
              disabled={isPending}
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังสร้างโพสต์...
              </>
            ) : (
              "สร้างโพสต์"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
