import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileArchive, FileImage, FileSpreadsheet, FileText, Presentation, ScanText } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "دليل الصيغ", description: "دليل مبسّط لصيغ PDF والمستندات والجداول والصور ومسارات التحويل بينها." };
const families = [
  { icon: FileText, name: "PDF", formats: "PDF · PDF/A", note: "للمشاركة والطباعة والأرشفة" },
  { icon: ScanText, name: "المستندات", formats: "DOC · DOCX · HTML · MD", note: "للنصوص والتحرير والنشر" },
  { icon: FileSpreadsheet, name: "الجداول", formats: "XLS · XLSX", note: "للبيانات والحسابات" },
  { icon: Presentation, name: "العروض", formats: "PPT · PPTX", note: "للشرائح والعرض" },
  { icon: FileImage, name: "الصور", formats: "JPG · PNG · WebP · HEIC · SVG", note: "للصور والمسح والويب" },
  { icon: FileArchive, name: "الحزم", formats: "ZIP", note: "لجمع ملفات متعددة" },
];
const routes = [
  ["أريد التعديل", "PDF ← Word", "/tool/pdf-to-word"], ["أريد إرسال نسخة ثابتة", "Word ← PDF", "/tool/word-to-pdf"],
  ["أريد جدولًا", "PDF ← Excel", "/tool/pdf-to-excel"], ["أريد صور الصفحات", "PDF ← JPG", "/tool/pdf-to-jpg"],
  ["أريد ملفًا من الصور", "JPG ← PDF", "/tool/jpg-to-pdf"], ["أريد نصًا من مسح", "صورة ← نص", "/tool/image-to-text"],
];

export default function FormatsPage() {
  return <main><SiteHeader /><section className="formats-hero shell"><span className="eyebrow"><span className="eyebrow-line" /> لا تحفظ الامتدادات</span><h1>اختر الصيغة<br />حسب <em>الهدف.</em></h1><p>دليل عملي يختصر الفرق بين الصيغ ويقودك مباشرة إلى الأداة المناسبة.</p></section>
    <section className="format-families shell">{families.map(({ icon: Icon, name, formats, note }, index) => <article key={name}><div><Icon size={23} /><span>0{index + 1}</span></div><h2>{name}</h2><strong>{formats}</strong><p>{note}</p></article>)}</section>
    <section className="format-routes shell"><div><span className="eyebrow">ابدأ من النتيجة</span><h2>ماذا تريد من الملف؟</h2><p>اختر الهدف بدل التفكير في اسم الأداة.</p></div><div>{routes.map(([goal, route, href]) => <Link href={href} key={goal}><span>{goal}</span><strong>{route}</strong><ArrowLeft size={17} /></Link>)}</div></section>
    <section className="format-tip shell"><strong>قاعدة سريعة</strong><p>استخدم PDF عندما تريد الحفاظ على الشكل، وDOCX عندما تريد التحرير، وXLSX عندما تكون بنية الجدول أهم من مظهر الصفحة.</p><Link href="/guides">اقرأ الأدلة <ArrowLeft size={16} /></Link></section><SiteFooter /></main>;
}
