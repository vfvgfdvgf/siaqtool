import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, ChevronLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolGlyph } from "@/components/tool-glyph";
import { availableToolSlugs, categories, categoryDescriptions, categoryLabels, tools, type ToolCategory } from "@/lib/content";

export function generateStaticParams() { return categories.map((category) => ({ category })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> { const category = (await params).category as ToolCategory; return categories.includes(category) ? { title: categoryLabels[category], description: categoryDescriptions[category] } : {}; }

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = (await params).category as ToolCategory; if (!categories.includes(category)) notFound();
  const items = tools.filter((tool) => tool.category === category);
  return <main><SiteHeader /><section className={`category-page-hero category-page-${category}`} data-reveal><div className="shell"><nav className="breadcrumb"><Link href="/">الرئيسية</Link><ChevronLeft size={14} /><Link href="/tools">الأدوات</Link></nav><span className="category-count">{items.length} أدوات</span><h1>{categoryLabels[category]}</h1><p>{categoryDescriptions[category]}</p></div></section><section className="category-page-grid shell" data-reveal>{items.map((tool, index) => <Link href={`/tool/${tool.slug}`} key={tool.slug} className="category-tool-row"><span className="category-tool-number">{String(index + 1).padStart(2, "0")}</span><span className="category-tool-icon"><ToolGlyph slug={tool.slug} size={23} /></span><div><h2>{tool.title}</h2><p>{tool.short}</p><small>{availableToolSlugs.has(tool.slug) ? "جاهزة الآن" : "قريبًا"}</small></div><ArrowUpLeft size={19} /></Link>)}</section><section className="category-next shell" data-reveal><div><span>لم تجد ما تحتاجه؟</span><h2>استعرض المكتبة كاملة.</h2></div><Link href="/tools">كل الأدوات <ArrowLeft size={17} /></Link></section><SiteFooter /></main>;
}
