# 🚀 Next.js Starter Project

Starter Template สำหรับการพัฒนาเว็บแอปพลิเคชันด้วย Next.js พร้อมการรวมเทคโนโลยี Prisma, TailwindCSS, React Hook Form และ NextAuth

---

## 📦 เทคโนโลยีที่ใช้

- **Next.js** 15.4.4
- **React** 19.1.0
- **TailwindCSS** 4
- **Prisma ORM** 6.12.0
- **NextAuth** สำหรับระบบ Authentication
- **React Hook Form** สำหรับจัดการฟอร์ม
- **Zod** สำหรับ validation
- **Radix UI** สำหรับ UI Components
- **Lucide Icons** สำหรับไอคอน
- **UUID** สำหรับการสร้าง ID แบบไม่ซ้ำ

---

## 🛠️ คำสั่งที่ใช้บ่อย

| คำสั่ง                | รายละเอียด                     |
| --------------------- | ------------------------------ |
| `npm run dev`         | เริ่มเซิร์ฟเวอร์ในโหมดพัฒนา    |
| `npm run build`       | สร้างโปรเจกต์สำหรับ production |
| `npm start`           | เริ่มเซิร์ฟเวอร์ production    |
| `npm run lint`        | ตรวจสอบโค้ดด้วย ESLint         |
| `npm run db:push`     | ส่ง schema ไปยังฐานข้อมูล      |
| `npm run db:studio`   | เปิด Prisma Studio             |
| `npm run db:generate` | สร้าง Prisma client ใหม่       |
| `npm run db:seed`     | รันสคริปต์ seed ข้อมูล         |

---

## 🧪 การเริ่มต้นใช้งาน

1. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

## 🧭 เส้นทาง

| Path                           | รายละเอียด                           |
| ------------------------------ | ------------------------------------ |
| `/profile`                     | จัดการโปรไฟล์ผู้ใช้                  |
| `/auth/new-password?token=xxx` | ตั้งรหัสผ่านใหม่ผ่านลิงก์ที่มี token |
| `/dashboard`                   | แดชบอร์ด                             |
| `/auth/reset-password`         | หน้า rest password                   |
| `/auth/signin`                 | หน้า login                           |
| `/auth/signup`                 | หน้าสมัคร                            |
