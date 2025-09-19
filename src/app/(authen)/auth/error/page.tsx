import type { Metadata } from "next";
import ErrorPageClient from "./ErrorPageClient";

export const metadata: Metadata = {
  title: "เกิดข้อผิดพลาด",
  description: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
};

export default function ErrorPage() {
  return <ErrorPageClient />;
}
