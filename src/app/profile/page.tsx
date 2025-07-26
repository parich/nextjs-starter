import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/profile/profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, User, Shield } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      posts: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            โปรไฟล์
          </h1>
          <p className="text-muted-foreground">
            จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="activity">กิจกรรม</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Info Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    ข้อมูลบัญชี
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      สมัครเมื่อ{" "}
                      {new Date(user.createdAt).toLocaleDateString("th-TH")}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {user._count.posts}
                      </div>
                      <div className="text-xs text-muted-foreground">โพสต์</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {user._count.followers}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ผู้ติดตาม
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {user._count.following}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        กำลังติดตาม
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>แก้ไขข้อมูลส่วนตัว</CardTitle>
                  <CardDescription>
                    อัปเดตข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm user={user} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>โพสต์ล่าสุด</CardTitle>
                <CardDescription>โพสต์ที่คุณเขียนล่าสุด</CardDescription>
              </CardHeader>
              <CardContent>
                {user.posts.length > 0 ? (
                  <div className="space-y-4">
                    {user.posts.map((post) => (
                      <div
                        key={post.id}
                        className="border-l-4 border-primary pl-4"
                      >
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(post.createdAt).toLocaleDateString("th-TH")}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">ยังไม่มีโพสต์</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
