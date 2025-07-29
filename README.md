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

### 🖥️ Frontend

- ✅ **Zod Schema Validation** — ตรวจสอบข้อมูลฟอร์มอย่างปลอดภัย
- ✅ **React Hook Form** — จัดการฟอร์มแบบมีประสิทธิภาพ
- ✅ **Sonner Toast Notifications** — แจ้งเตือนแบบเรียลไทม์
- ✅ **Role-based UI Components** — แสดง UI ตามสิทธิ์ของผู้ใช้

### 🛠️ Backend

- 🔒 **Server Actions** — จัดการ logic ฝั่งเซิร์ฟเวอร์แบบปลอดภัย
- 🔒 **Protected API Routes** — API ที่มีการป้องกันการเข้าถึง
- 🔒 **Middleware Protection** — ตรวจสอบสิทธิ์ก่อนเข้าถึงหน้า/เส้นทาง
- 🔗 **Database Integration** — เชื่อมต่อฐานข้อมูลผ่าน Prisma ORM

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

## 🌐 รายการเส้นทางทั้งหมด

| Path                      | ขนาดไฟล์ | ขนาดรวม | รายละเอียด                     |
| ------------------------- | -------- | ------- | ------------------------------ |
| `/`                       | 518 B    | 148 kB  | หน้าแรกของระบบ                 |
| `/admin`                  | 137 B    | 99.8 kB | หน้าสำหรับผู้ดูแลระบบ          |
| `/api/admin/users`        | 137 B    | 99.8 kB | API สำหรับจัดการผู้ใช้         |
| `/api/auth/[...nextauth]` | 137 B    | 99.8 kB | API สำหรับ NextAuth            |
| `/api/protected`          | 137 B    | 99.8 kB | API ที่มีการป้องกัน            |
| `/auth/error`             | 3.9 kB   | 116 kB  | แสดงข้อผิดพลาดในการเข้าสู่ระบบ |
| `/auth/new-password`      | 4.01 kB  | 136 kB  | ตั้งรหัสผ่านใหม่ผ่าน token     |
| `/auth/reset-password`    | 2.47 kB  | 135 kB  | รีเซ็ตรหัสผ่าน                 |
| `/auth/signin`            | 5.59 kB  | 151 kB  | เข้าสู่ระบบ                    |
| `/auth/signup`            | 5.22 kB  | 150 kB  | สมัครสมาชิก                    |
| `/auth/two-factor`        | 3.52 kB  | 145 kB  | ยืนยันตัวตนแบบสองขั้นตอน       |
| `/auth/verify-email`      | 3.58 kB  | 125 kB  | ยืนยันอีเมลของผู้ใช้           |
| `/dashboard`              | 164 B    | 103 kB  | หน้าหลักหลังเข้าสู่ระบบ        |
| `/user`                   | 137 B    | 99.8 kB | หน้าข้อมูลผู้ใช้ทั่วไป         |
| `/profile`                | 6.27 kB  | 151 kB  | จัดการโปรไฟล์ผู้ใช้            |
| `/test-protection`        | 3.38 kB  | 180 kB  | ทดสอบการป้องกันเส้นทาง         |
| `/404` หรือ `/_not-found` | 991 B    | 101 kB  | หน้าสำหรับเส้นทางที่ไม่พบ      |

---
