import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Contrast, Keyboard, Languages, MousePointer2, Smartphone, Volume2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "سهولة الوصول", description: "كيف يصمم سياق تجربة ملفات أوضح عبر لوحة المفاتيح والهاتف وقارئات الشاشة." };
const commitments = [
  { icon: Keyboard, title: "لوحة المفاتيح", text: "ترتيب تنقّل منطقي وحالات تركيز واضحة للعناصر التفاعلية." },
  { icon: Contrast, title: "تباين مقروء", text: "أبيض وأسود كأساس، والأحمر للتأكيد لا لشرح الحالة وحده." },
  { icon: Smartphone, title: "مساحات لمس", text: "أزرار وحقول مناسبة للشاشات الصغيرة دون تكبير متكرر." },
  { icon: Volume2, title: "وصف واضح", text: "تسميات نصية للحقول والصور المهمة وحالات المعالجة." },
  { icon: Languages, title: "عربي من الأساس", text: "اتجاه RTL وترتيب بصري صُمما للمحتوى العربي." },
  { icon: MousePointer2, title: "واجهة ثابتة", text: "أزلنا الحركة الزخرفية حتى تبقى القراءة والتنقّل هادئين ومتوقعين." },
];
export default function AccessibilityPage() { return <main><SiteHeader /><section className="access-hero shell"><span className="eyebrow"><span className="eyebrow-line" /> التصميم للجميع</span><h1>الوصول ليس<br /><em>إضافة لاحقة.</em></h1><p>نبني الواجهة لتظل واضحة عند استخدام اللمس أو لوحة المفاتيح أو التكبير. هذه مبادئ عمل وليست ادعاء اعتماد رسمي.</p></section><section className="access-grid shell">{commitments.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={22} /><h2>{title}</h2><p>{text}</p></article>)}</section><section className="access-contact shell"><div><span>وجدت عائقًا؟</span><h2>صف لنا الخطوة التي توقفت عندها.</h2><p>اذكر الجهاز والمتصفح واسم الأداة، ولا ترسل مستندًا حساسًا.</p></div><Link href="/contact">أبلغنا بالمشكلة <ArrowLeft size={17} /></Link></section><SiteFooter /></main>; }
