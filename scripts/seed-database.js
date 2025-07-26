import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 เริ่มต้น seeding database...");

  // สร้างผู้ใช้ Admin
  const adminPassword = await bcrypt.hash("password123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      id: "admin-user-id",
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  // สร้างผู้ใช้ทั่วไป
  const userPassword = await bcrypt.hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      id: "test-user-id",
      name: "Test User",
      email: "test@example.com",
      password: userPassword,
      role: "USER",
      emailVerified: new Date(),
    },
  });

  // สร้างโพสต์ตัวอย่าง
  const post1 = await prisma.post.upsert({
    where: { id: "post-1" },
    update: {},
    create: {
      id: "post-1",
      title: "โพสต์แรกของฉัน",
      content: "นี่คือเนื้อหาของโพสต์แรก",
      published: true,
      authorId: user.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: "post-2" },
    update: {},
    create: {
      id: "post-2",
      title: "โพสต์ที่สอง",
      content: "เนื้อหาของโพสต์ที่สอง",
      published: true,
      authorId: admin.id,
    },
  });

  // สร้าง Tags
  const tag1 = await prisma.tag.upsert({
    where: { id: "tag-1" },
    update: {},
    create: {
      id: "tag-1",
      name: "เทคโนโลยี",
    },
  });

  const tag2 = await prisma.tag.upsert({
    where: { id: "tag-2" },
    update: {},
    create: {
      id: "tag-2",
      name: "การเขียนโปรแกรม",
    },
  });

  // เชื่อม Posts กับ Tags
  await prisma.postTag.upsert({
    where: {
      postId_tagId: {
        postId: post1.id,
        tagId: tag1.id,
      },
    },
    update: {},
    create: {
      postId: post1.id,
      tagId: tag1.id,
    },
  });

  console.log("✅ Seeding เสร็จสิ้น!");
  console.log("👤 Admin: admin@example.com (password: password123)");
  console.log("👤 User: test@example.com (password: password123)");
}

main()
  .catch((e) => {
    console.error("❌ เกิดข้อผิดพลาดในการ seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
