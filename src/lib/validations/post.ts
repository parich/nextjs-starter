import { z } from "zod"

export const createPostSchema = z.object({
  title: z.string().min(1, "กรุณาใส่หัวข้อ").min(3, "หัวข้อต้องมีอย่างน้อย 3 ตัวอักษร").max(100, "หัวข้อต้องไม่เกิน 100 ตัวอักษร"),
  content: z
    .string()
    .min(1, "กรุณาใส่เนื้อหา")
    .min(10, "เนื้อหาต้องมีอย่างน้อย 10 ตัวอักษร")
    .max(1000, "เนื้อหาต้องไม่เกิน 1000 ตัวอักษร"),
})

export const testApiSchema = z.object({
  message: z.string().min(1, "กรุณาใส่ข้อความ").max(200, "ข้อความต้องไม่เกิน 200 ตัวอักษร"),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type TestApiInput = z.infer<typeof testApiSchema>
