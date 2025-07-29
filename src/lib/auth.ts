import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";
import { generateTwoFactorToken } from "@/lib/tokens";
import { sendTwoFactorEmail } from "@/lib/mail";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 1800, // 30 minutes in seconds
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        twoFactorCode: {
          label: "Two-Factor Code",
          type: "text",
          required: false,
        },
      },
      async authorize(credentials) {
        const { email, password, twoFactorCode } = credentials as {
          email?: string;
          password?: string;
          twoFactorCode?: string;
        };

        if (!email) {
          throw new Error("CredentialsSignin"); // Email is always required
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("CredentialsSignin"); // User not found
        }

        // --- Two-Factor Authentication Verification Flow ---
        // ถ้า 2FA เปิดใช้งานอยู่ และมี 2FA code มาด้วย
        if (user.isTwoFactorEnabled && twoFactorCode) {
          const twoFactorToken = await prisma.twoFactorToken.findUnique({
            where: { email: user.email, token: twoFactorCode },
          });

          if (!twoFactorToken) {
            throw new Error("InvalidTwoFactorCode");
          }

          const hasExpired = new Date(twoFactorToken.expires) < new Date();
          if (hasExpired) {
            await prisma.twoFactorToken.delete({
              where: { id: twoFactorToken.id },
            });
            throw new Error("TwoFactorCodeExpired");
          }

          // ถ้า code ถูกต้องและยังไม่หมดอายุ ให้ลบ token และอนุญาตให้เข้าสู่ระบบ
          await prisma.twoFactorToken.delete({
            where: { id: twoFactorToken.id },
          });
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
            isTwoFactorEnabled: user.isTwoFactorEnabled,
          };
        }

        // --- Regular Login Flow (requires password) ---
        // ถ้าไม่มี password หรือ user ไม่มี password (เช่น OAuth user ที่ยังไม่ได้ตั้ง password)
        if (!password || !user.password) {
          throw new Error("CredentialsSignin"); // Password required for regular login
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error("CredentialsSignin");
        }

        // ตรวจสอบว่า email ได้รับการยืนยันแล้วหรือไม่
        if (!user.emailVerified) {
          throw new Error("EmailNotVerified");
        }

        // ถ้า 2FA เปิดใช้งานอยู่ แต่ไม่มี code มาด้วย (คือการ login ครั้งแรกที่ต้องใช้ 2FA)
        if (user.isTwoFactorEnabled && !twoFactorCode) {
          const twoFactorToken = await generateTwoFactorToken(user.email);
          await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
          throw new Error("TwoFactorRequired"); // แจ้งให้ผู้ใช้ป้อน 2FA code
        }

        // ถ้าไม่มี 2FA หรือ 2FA ถูกปิดใช้งาน และ login ปกติสำเร็จ
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
          isTwoFactorEnabled: user.isTwoFactorEnabled,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("🚀 ~ signIn ~ user:", user);
      // อนุญาต OAuth providers โดยไม่ต้องตรวจสอบ email verification
      if (account?.provider !== "credentials") return true;

      // สำหรับ credentials:
      // การตรวจสอบ emailVerified และ 2FA ถูกย้ายไปที่ authorize callback แล้ว
      return true;
    },
    async jwt({ token, user }) {
      console.log("🚀 ~ jwt ~ token:", token);
      if (user) {
        token.role = user.role;
        token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🚀 ~ session ~ session:", session);
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      console.log("🚀 ~ linkAccount ~ user:", user);
      // เมื่อ link account ด้วย OAuth ให้ mark email เป็น verified
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
});
