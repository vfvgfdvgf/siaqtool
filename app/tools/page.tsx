import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolFinder } from "@/components/tool-finder";

export const metadata: Metadata = { title: "كل الأدوات", description: "استعرض 146 أداة عربية لتحويل وتنظيم وتعديل ملفات PDF والمستندات والصور والبيانات.", alternates: { canonical: "/tools" } };

export default function ToolsPage() {
  return <main><SiteHeader /><section className="catalog-intro shell"><span className="eyebrow"><span className="eyebrow-line" /> 146 أداة فعلية</span><h1>مكتبة الملفات.</h1><p>ابحث باسم المهمة أو الصيغة، ثم انتقل مباشرة إلى مساحة العمل المناسبة.</p></section><ToolFinder /><SiteFooter /></main>;
}
