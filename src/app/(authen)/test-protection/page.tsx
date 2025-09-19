import { requireAuth } from "@/lib/auth-utils";
import { RoleGuard } from "@/components/auth/role-guard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatePostForm } from "@/components/forms/create-post-form";
import { TestApiForm } from "@/components/forms/test-api-form";
import { QuickTestForm } from "@/components/forms/quick-test-form";
import { Navbar } from "@/components/navigation/navbar";

export default async function TestProtectionPage() {
  // ต้อง login ถึงจะเข้าได้
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              ทดสอบการป้องกัน
            </h1>
            <p className="text-muted-foreground">
              ตัวอย่างการใช้งาน Role Guard, Zod Validation และ Sonner Toast
            </p>
          </div>

          {/* เนื้อหาสำหรับผู้ใช้ทั่วไป */}
          <Card>
            <CardHeader>
              <CardTitle>เนื้อหาสำหรับผู้ใช้ทั่วไป</CardTitle>
              <CardDescription>
                ทุกคนที่ login แล้วสามารถเห็นได้
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>สวัสดี {session.user.name || session.user.email}!</p>
                <p>
                  Role ของคุณ:{" "}
                  <span className="font-semibold">{session.user.role}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  หน้านี้ใช้ Zod สำหรับ validation และ Sonner สำหรับ toast
                  notifications
                </p>
              </div>
            </CardContent>
          </Card>

          {/* เนื้อหาสำหรับ Admin เท่านั้น */}
          <RoleGuard allowedRoles={["ADMIN"]}>
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-600">
                  🔐 เนื้อหาสำหรับ Admin เท่านั้น
                </CardTitle>
                <CardDescription>
                  เฉพาะ Admin เท่านั้นที่เห็นได้
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>นี่คือเนื้อหาลับสำหรับ Admin!</p>
                  <Button variant="destructive" size="sm">
                    ปุ่มสำหรับ Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>

          {/* เนื้อหาสำหรับ Moderator และ Admin */}
          <RoleGuard allowedRoles={["MODERATOR", "ADMIN"]}>
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-600">
                  ⚡ เนื้อหาสำหรับ Moderator และ Admin
                </CardTitle>
                <CardDescription>
                  Moderator และ Admin เท่านั้นที่เห็นได้
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>เครื่องมือสำหรับการจัดการเนื้อหา</p>
                  <Button variant="secondary" size="sm">
                    เครื่องมือ Moderator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>

          {/* Forms ที่ใช้ Zod */}
          <div className="grid gap-6 lg:grid-cols-2">
            <QuickTestForm />
            <TestApiForm />
          </div>

          <CreatePostForm />

          {/* ข้อมูลเพิ่มเติม */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">
                📋 คุณสมบัติที่ใช้ในหน้านี้
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1">
                  <h4 className="font-semibold">Frontend:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Zod Schema Validation</li>
                    <li>• React Hook Form</li>
                    <li>• Sonner Toast Notifications</li>
                    <li>• Role-based UI Components</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">Backend:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Server Actions</li>
                    <li>• Protected API Routes</li>
                    <li>• Middleware Protection</li>
                    <li>• Database Integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
