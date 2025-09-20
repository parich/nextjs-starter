import Link from "next/link";
import { socialLinks } from "@/data/socials";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" aria-labelledby="footer-content">
          <h2 id="footer-content" className="sr-only">ข้อมูลเว็บไซต์และลิงก์ที่เป็นประโยชน์</h2>

          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold mb-4 block" aria-label="กลับสู่หน้าแรก">
              Sandbox
            </Link>
            <p className="text-gray-300 mb-4">
              ระบบ Authentication ที่สมบูรณ์สำหรับ Next.js
            </p>
            <nav aria-label="โซเชียลมีเดีย">
              <ul className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      style={{ color: link.color }}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`ติดตาม ${link.icon} (เปิดหน้าต่างใหม่)`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <circle cx="10" cy="10" r="8" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="quick-links-heading">
            <h3 id="quick-links-heading" className="text-lg font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  แดชบอร์ด
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  โปรไฟล์
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-gray-300 hover:text-white transition-colors">
                  เข้าสู่ระบบ
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-gray-300 hover:text-white transition-colors">
                  สมัครสมาชิก
                </Link>
              </li>
            </ul>
          </nav>

          {/* Documentation */}
          <nav aria-labelledby="docs-heading">
            <h3 id="docs-heading" className="text-lg font-semibold mb-4">เอกสาร</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                  คู่มือการใช้งาน
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-300 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/docs/components" className="text-gray-300 hover:text-white transition-colors">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                  การสนับสนุน
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <address aria-labelledby="contact-heading">
            <h3 id="contact-heading" className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
            <div className="space-y-2 text-gray-300 not-italic">
              <p>
                <a href="mailto:info@email.com" className="hover:text-white transition-colors">
                  info@email.com
                </a>
              </p>
              <p>
                <a href="tel:+66123456789" className="hover:text-white transition-colors">
                  00 (123) 456 78 90
                </a>
              </p>
              <p className="text-sm">
                <time>จันทร์-ศุกร์: 9:00-18:00</time><br />
                <time>เสาร์: 9:00-12:00</time>
              </p>
            </div>
          </address>
        </section>

        {/* Bottom Bar */}
        <section className="border-t border-gray-800 pt-8" aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="sr-only">ข้อมูลลิขสิทธิ์และนโยบาย</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © <time>2024</time> Sandbox. สงวนลิขสิทธิ์.
            </p>
            <nav aria-label="นโยบายและข้อกำหนด">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    ข้อกำหนดการใช้งาน
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                    นโยบายคุกกี้
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  );
}