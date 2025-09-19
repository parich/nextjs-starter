import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes ที่ต้อง login
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/admin",
  "/user",
  "/api/protected",
];

// Routes สำหรับ admin เท่านั้น
const adminRoutes = ["/admin", "/api/admin"];

// Routes สำหรับ user ที่ login แล้ว (ไม่ควรเข้าได้)
const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/new-password",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: NextRequest & { auth: any }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // อนุญาต API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // ถ้า login แล้วและพยายามเข้า auth pages -> redirect ไป dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // ถ้าเป็น admin route แต่ไม่ใช่ admin -> redirect ไป dashboard
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // ถ้าเป็น protected route แต่ยังไม่ login -> redirect ไป signin
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
