import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolFinder } from "@/components/tool-finder";

export const metadata: Metadata = { title: "كل الأدوات", description: "مكتبة سياق الكاملة لتحويل وتنظيم وتعديل ملفات PDF والمستندات والصور." };

export default function ToolsPage() {
  return <main><SiteHeader /><section className="catalog-intro shell"><span className="eyebrow"><span className="eyebrow-line" /> كل الأدوات</span><h1>مكتبة الملفات.</h1><p>ابحث بالصيغة أو المهمة، ثم انتقل مباشرة إلى مساحة العمل المناسبة.</p></section><ToolFinder /><SiteFooter /></main>;
}

