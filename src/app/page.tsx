import { MainLayoutPadded } from "@/components/layouts/MainLayout";
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

export default function HomePage() {
  return (
    <MainLayoutPadded className="bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="text-center mb-16" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="text-4xl font-bold text-gray-900 sm:text-6xl mb-6">
            ระบบ Authentication
            <span className="text-indigo-600"> ที่สมบูรณ์</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ระบบจัดการผู้ใช้และการยืนยันตัวตนที่ครบครันด้วย Next.js, NextAuth
            v5, และ Prisma
          </p>
          <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="การกระทำหลัก">
            <Button asChild size="lg">
              <Link href="/auth/signup">เริ่มต้นใช้งาน</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/signin">เข้าสู่ระบบ</Link>
            </Button>
          </nav>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">คุณสมบัติหลัก</h2>
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
        </section>

        {/* Demo Links */}
        <section className="text-center" aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="text-2xl font-bold text-gray-900 mb-8">ทดลองใช้งาน</h2>
          <nav className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto" aria-label="ลิงก์ทดลองใช้งาน">
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
          </nav>
        </section>

        {/* Test Content for Scrolling */}
        <section className="mt-32 space-y-16" aria-labelledby="scroll-test-heading">
          <header className="text-center">
            <h2 id="scroll-test-heading" className="text-3xl font-bold text-gray-900 mb-8">เพิ่มเนื้อหาเพื่อทดสอบ Scroll</h2>
            <p className="text-lg text-gray-600 mb-16">เลื่อนลงเพื่อดู Top Banner หายไป</p>
          </header>

          {Array.from({ length: 10 }, (_, i) => (
            <article key={i} className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-4xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">ส่วนที่ {i + 1}</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                เนื้อหาภาษาไทยเพื่อทดสอบ Scroll Behavior ของ Header ที่เราสร้างขึ้น
                เมื่อเลื่อนลงมา Top Banner ควรจะหายไป และเมื่อเลื่อนขึ้นไป ควรจะกลับมาแสดง
                พร้อมกับ Animation ที่นุ่มนวล
              </p>
            </article>
          ))}

          <footer className="text-center py-16">
            <p className="text-lg text-gray-600">จบการทดสอบ - เลื่อนขึ้นเพื่อดู Top Banner กลับมา</p>
          </footer>
        </section>
    </MainLayoutPadded>
  );
}
