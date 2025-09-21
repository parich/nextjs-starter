import Link from "next/link";
import { socialLinks } from "@/data/socials";
import { footerSections, legalLinks, contactInfo } from "@/data/footer-links";

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
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                        style={{ color: link.color }}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`ติดตาม ${link.name} (เปิดหน้าต่างใหม่)`}
                      >
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <nav key={index} aria-labelledby={`section-${index}-heading`}>
              <h3 id={`section-${index}-heading`} className="text-lg font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                        aria-label={`${link.label} (เปิดหน้าต่างใหม่)`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Info */}
          <address aria-labelledby="contact-heading">
            <h3 id="contact-heading" className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
            <div className="space-y-2 text-gray-300 not-italic">
              <p>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                  {contactInfo.phoneDisplay}
                </a>
              </p>
              <p className="text-sm">
                <time>{contactInfo.hours.weekdays}</time><br />
                <time>{contactInfo.hours.saturday}</time>
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
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  );
}