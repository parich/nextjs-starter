import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Users, Lock, Zap } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl mb-6">
            ระบบ Authentication
            <span className="text-indigo-600"> ที่สมบูรณ์</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ระบบจัดการผู้ใช้และการยืนยันตัวตนที่ครบครันด้วย Next.js, NextAuth
            v5, และ Prisma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/signup">เริ่มต้นใช้งาน</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/signin">เข้าสู่ระบบ</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>ความปลอดภัยสูง</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                ระบบรักษาความปลอดภัยด้วย bcrypt, JWT และ CSRF protection
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>จัดการ Role</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                ระบบจัดการสิทธิ์ผู้ใช้แบบ Role-based (User, Moderator, Admin)
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Route Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                ป้องกันหน้าเว็บและ API ด้วย Middleware และ Server Actions
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>ประสิทธิภาพสูง</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                ใช้ Next.js App Router, Server Components และ Prisma ORM
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Demo Links */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">ทดลองใช้งาน</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button
              asChild
              variant="outline"
              className="h-auto p-4 bg-transparent"
            >
              <Link href="/dashboard" className="flex flex-col items-center">
                <span className="font-semibold">แดชบอร์ด</span>
                <span className="text-sm text-muted-foreground">
                  หน้าหลักผู้ใช้
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto p-4 bg-transparent"
            >
              <Link href="/profile" className="flex flex-col items-center">
                <span className="font-semibold">โปรไฟล์</span>
                <span className="text-sm text-muted-foreground">
                  จัดการข้อมูลส่วนตัว
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto p-4 bg-transparent"
            >
              <Link
                href="/test-protection"
                className="flex flex-col items-center"
              >
                <span className="font-semibold">ทดสอบระบบ</span>
                <span className="text-sm text-muted-foreground">
                  ทดสอบการป้องกัน
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
