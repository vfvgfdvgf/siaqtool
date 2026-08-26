import Link from "next/link";
import { Check, Globe2, ShieldCheck } from "lucide-react";
import { Brand } from "@/components/brand";
import { tools } from "@/lib/content";

const columns = [
  { title: "الأدوات", links: [["كل الأدوات", "/tools"], ["أدوات PDF", "/tools/pdf"], ["أوفيس والبيانات", "/tools/office"], ["أدوات الصور", "/tools/image"]] },
  { title: "الحلول", links: [["التحويلات", "/tools/convert"], ["التعديل والحماية", "/tools/edit"], ["الأدوات الذكية", "/tools/smart"], ["مسارات العمل", "/workflows"]] },
  { title: "المعرفة", links: [["دليل الصيغ", "/formats"], ["الأدلة", "/guides"], ["المدونة", "/blog"], ["المساعدة", "/help"]] },
  { title: "سياق", links: [["عن المنصة", "/about"], ["الأمان", "/security"], ["سهولة الوصول", "/accessibility"], ["تواصل معنا", "/contact"]] },
];

export function SiteFooter() {
  return (
    <footer className="site-footer apple-footer compact-footer">
      <div className="shell footer-main">
        <div className="footer-brand"><Brand /><p>أدوات عربية واضحة لتحويل وتنظيم وحماية الملفات، دون قوائم معقّدة.</p><div className="footer-trust"><span><Check size={14} /> {tools.length} أداة</span><span><ShieldCheck size={14} /> معالجة مؤقتة</span><span><Globe2 size={14} /> عربي بالكامل</span></div></div>
        <div className="footer-links" aria-label="روابط الموقع">{columns.map((column) => <div key={column.title}><span>{column.title}</span>{column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>)}</div>
      </div>
      <div className="shell footer-legal"><div><Link href="/privacy">الخصوصية</Link><Link href="/terms">الشروط</Link><Link href="/cookies">الكوكيز</Link><Link href="/contact">التواصل</Link></div><span>© {new Date().getFullYear()} سياق · getsiaq.com</span></div>
    </footer>
  );
}
