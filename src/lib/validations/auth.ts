import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "กรุณาใส่อีเมลที่ถูกต้อง",
  }),
  password: z.string().min(1, {
    message: "กรุณาใส่รหัสผ่าน",
  }),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร",
    }),
    email: z.string().email({
      message: "กรุณาใส่อีเมลที่ถูกต้อง",
    }),
    password: z.string().min(8, {
      message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "กรุณาใส่อีเมลที่ถูกต้อง",
  }),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
