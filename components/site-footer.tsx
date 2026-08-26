import Link from "next/link";
import { ArrowLeft, Check, Globe2, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";

const columns = [
  { title: "الأدوات", links: [["كل الأدوات", "/tools"], ["أدوات PDF", "/tools/pdf"], ["أدوات أوفيس", "/tools/office"], ["أدوات الصور", "/tools/image"]] },
  { title: "الحلول", links: [["التحويلات", "/tools/convert"], ["التعديل والحماية", "/tools/edit"], ["الأدوات الذكية", "/tools/smart"], ["مسارات العمل", "/workflows"]] },
  { title: "الموارد", links: [["دليل الصيغ", "/formats"], ["الأدلة", "/guides"], ["المدونة", "/blog"], ["المساعدة", "/help"]] },
  { title: "سياق", links: [["عن المنصة", "/about"], ["الأمان", "/security"], ["سهولة الوصول", "/accessibility"], ["تواصل معنا", "/contact"]] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer apple-footer">
      <div className="shell footer-cta"><span>سياق لتحويل الملفات</span><h2>الأداة المناسبة.<br />في اللحظة المناسبة.</h2><p>اختر المهمة وابدأ مباشرة، دون تسجيل أو قوائم معقّدة.</p><Link href="/tools">استعرض الأدوات <ArrowLeft size={17} /></Link></div>
      <div className="shell footer-main">
        <div className="footer-brand"><Brand /><p>أدوات عربية واضحة لتحويل وتنظيم وحماية الملفات.</p><div className="footer-trust"><span><Check size={14} /> بدون تسجيل</span><span><ShieldCheck size={14} /> معالجة مؤقتة</span><span><Globe2 size={14} /> عربي بالكامل</span></div></div>
        <div className="footer-links" aria-label="روابط الموقع">{columns.map((column) => <div key={column.title}><span>{column.title}</span>{column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>)}</div>
      </div>
      <div className="shell footer-legal"><div><Link href="/privacy">الخصوصية</Link><Link href="/terms">الشروط</Link><Link href="/cookies">الكوكيز</Link><Link href="/contact">تواصل معنا</Link></div><span>© {new Date().getFullYear()} سياق · getsiaq.com</span></div>
    </footer>
  );
}
