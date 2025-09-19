import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            แดชบอร์ด
          </h1>
          <p className="text-muted-foreground">
            ยินดีต้อนรับ, {session.user?.name || session.user?.email}!
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" variant="outline">
            ออกจากระบบ
          </Button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">ข้อมูลผู้ใช้</h3>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p className="break-all">ID: {session.user?.id}</p>
            <p>ชื่อ: {session.user?.name}</p>
            <p className="break-all">อีเมล: {session.user?.email}</p>
            <p>บทบาท: {session.user?.role}</p>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">เมนูด่วน</h3>
          <div className="mt-4 space-y-2">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <Link href="/profile">จัดการโปรไฟล์</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
