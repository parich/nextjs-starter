import type React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  linkLabel: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
  linkLabel,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Back button */}
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
                <Link
                  href="/"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  กลับหน้าหลัก
                </Link>
              </Button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600">
                  <div className="h-6 w-6 rounded-full bg-white" />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-gray-900">
                  Auth System
                </h1>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            </div>

            {/* Form */}
            <div className="space-y-6">{children}</div>

            {/* Footer link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {linkText}{" "}
                <Link
                  href={linkHref}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {linkLabel}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image/Pattern */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[url('/images/auth-background.png')] bg-cover bg-center opacity-10" />

            {/* Content overlay */}
            <div className="relative flex h-full flex-col justify-center px-12 text-white">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold mb-4">
                  ระบบจัดการผู้ใช้ที่ทันสมัย
                </h3>
                <p className="text-lg text-blue-100 mb-8">
                  ระบบ authentication ที่ปลอดภัย
                  พร้อมการจัดการสิทธิ์และการยืนยันตัวตนแบบครบครัน
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-3" />
                    <span className="text-sm">ความปลอดภัยระดับสูง</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-3" />
                    <span className="text-sm">รองรับ OAuth providers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-3" />
                    <span className="text-sm">ยืนยันตัวตนผ่านอีเมล</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
