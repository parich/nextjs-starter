export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const quickLinks: FooterLink[] = [
  { href: "/dashboard", label: "แดชบอร์ด" },
  { href: "/profile", label: "โปรไฟล์" },
  { href: "/auth/signin", label: "เข้าสู่ระบบ" },
  { href: "/auth/signup", label: "สมัครสมาชิก" },
];

export const documentationLinks: FooterLink[] = [
  { href: "/docs", label: "คู่มือการใช้งาน" },
  { href: "/docs/api", label: "API Reference" },
  { href: "/docs/components", label: "Components" },
  { href: "/support", label: "การสนับสนุน" },
];

export const legalLinks: FooterLink[] = [
  { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
  { href: "/terms", label: "ข้อกำหนดการใช้งาน" },
  { href: "/cookies", label: "นโยบายคุกกี้" },
];

export const footerSections: FooterSection[] = [
  {
    title: "ลิงก์ด่วน",
    links: quickLinks,
  },
  {
    title: "เอกสาร",
    links: documentationLinks,
  },
];

export const contactInfo = {
  email: "info@email.com",
  phone: "+66123456789",
  phoneDisplay: "00 (123) 456 78 90",
  hours: {
    weekdays: "จันทร์-ศุกร์: 9:00-18:00",
    saturday: "เสาร์: 9:00-12:00",
  },
};