import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";

// ตรวจสอบว่า user login หรือไม่
export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return session;
}

// ตรวจสอบ role ของ user
export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard");
  }

  return session;
}

// ตรวจสอบว่าเป็น admin หรือไม่
export async function requireAdmin() {
  return await requireRole(["ADMIN"]);
}

// ตรวจสอบว่าเป็น moderator หรือ admin
export async function requireModerator() {
  return await requireRole(["ADMIN", "MODERATOR"]);
}

// สำหรับใช้ใน client components
export function hasRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

export function isAdmin(userRole: Role): boolean {
  return userRole === "ADMIN";
}

export function isModerator(userRole: Role): boolean {
  return userRole === "MODERATOR" || userRole === "ADMIN";
}
