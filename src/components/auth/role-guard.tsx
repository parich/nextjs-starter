"use client";

import type React from "react";
import { useSession } from "next-auth/react";
import type { Role } from "@prisma/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Loader2 } from "lucide-react";

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showLoading?: boolean;
}

export function RoleGuard({
  allowedRoles,
  children,
  fallback,
  showLoading = true,
}: RoleGuardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    if (!showLoading) return null;

    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">กำลังโหลด...</span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      fallback || (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            กรุณา login เพื่อเข้าถึงเนื้อหานี้
          </AlertDescription>
        </Alert>
      )
    );
  }

  if (!allowedRoles.includes(session.user.role)) {
    return (
      fallback || (
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>คุณไม่มีสิทธิ์เข้าถึงเนื้อหานี้</AlertDescription>
        </Alert>
      )
    );
  }

  return <>{children}</>;
}

// Hook สำหรับตรวจสอบ role ใน client components
export function useRole() {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
    role: session?.user?.role,
    isTwoFactorEnabled: session?.user?.isTwoFactorEnabled, // เพิ่มฟิลด์นี้
    hasRole: (roles: Role[]) =>
      session?.user ? roles.includes(session.user.role) : false,
    isAdmin: () => session?.user?.role === "ADMIN",
    isModerator: () =>
      session?.user?.role === "MODERATOR" || session?.user?.role === "ADMIN",
  };
}
