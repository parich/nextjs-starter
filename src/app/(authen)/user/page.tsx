import { requireAuth } from "@/lib/auth-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";

export default async function UserPage() {
  // ต้อง login ถึงจะเข้าได้
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              หน้าผู้ใช้
            </h1>
            <p className="text-muted-foreground">
              หน้านี้สำหรับผู้ใช้ที่ login แล้วเท่านั้น
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  ข้อมูลผู้ใช้
                </CardTitle>
                <CardDescription>ข้อมูลของคุณในระบบ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ชื่อ:</span>
                  <span className="text-sm">
                    {session.user.name || "ไม่ระบุ"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">อีเมล:</span>
                  <span className="text-sm">{session.user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">บทบาท:</span>
                  <Badge
                    variant={
                      session.user.role === "ADMIN" ? "default" : "secondary"
                    }
                  >
                    {session.user.role}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  สิทธิ์การเข้าถึง
                </CardTitle>
                <CardDescription>สิทธิ์ที่คุณมีในระบบ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">เข้าถึงหน้าผู้ใช้</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">แก้ไขโปรไฟล์</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      session.user.role === "ADMIN"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm">เข้าถึงหน้า Admin</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
