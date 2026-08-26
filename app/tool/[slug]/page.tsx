import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, ChevronLeft, Clock3, FileCheck2, LockKeyhole, ShieldCheck, Zap } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UploadZone } from "@/components/upload-zone";
import { ToolGlyph } from "@/components/tool-glyph";
import { availableToolSlugs, categoryLabels, getTool, tools } from "@/lib/content";

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  const description = `${tool.short} استخدم أداة ${tool.title} مجانًا بالعربية دون تسجيل.`;
  return {
    title: tool.title,
    description,
    alternates: { canonical: `/tool/${tool.slug}` },
    openGraph: { title: `${tool.title} | سياق`, description, url: `/tool/${tool.slug}`, locale: "ar_SA", type: "website" },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 6);
  const formats = tool.accept.split(",").map((format) => format.replace(".", "").toUpperCase());
  const isReady = availableToolSlugs.has(tool.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: tool.title, url: `https://getsiaq.com/tool/${tool.slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Web", inLanguage: "ar", description: tool.short, offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://getsiaq.com/" },
        { "@type": "ListItem", position: 2, name: categoryLabels[tool.category], item: `https://getsiaq.com/tools/${tool.category}` },
        { "@type": "ListItem", position: 3, name: tool.title, item: `https://getsiaq.com/tool/${tool.slug}` },
      ] },
    ],
  };

  return (
    <main>
      <SiteHeader />
      <section className="tool-stage shell">
        <nav className="breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><ChevronLeft size={14} /><Link href={`/tools/${tool.category}`}>{categoryLabels[tool.category]}</Link><ChevronLeft size={14} /><span>{tool.title}</span></nav>
        <div className="tool-stage-head">
          <div className={`tool-file-icon tone-${tool.category}`} aria-hidden="true"><ToolGlyph slug={tool.slug} size={30} /></div>
          <div><span className="eyebrow">{categoryLabels[tool.category]}</span><h1>{tool.title}</h1><p>{tool.short}</p></div>
          <div className={`stage-status ${isReady ? "ready" : ""}`}><i />{isReady ? "جاهزة الآن" : "قريبًا"}</div>
        </div>

        <div className="tool-workspace-layout refined-workspace">
          <UploadZone accept={tool.accept} multiple={tool.multiple} minFiles={tool.minFiles} toolTitle={tool.title} toolSlug={tool.slug} ready={isReady} />
          <aside className="refined-side-panel">
            <section><span>الصيغ المقبولة</span><div className="format-pills">{formats.map((format) => <b key={format}>{format}</b>)}</div></section>
            <section><span>طريقة الاستخدام</span><ol><li><b>1</b> اختر {tool.multiple ? "الملفات" : "الملف"}</li><li><b>2</b> راجع الإعدادات</li><li><b>3</b> نزّل النتيجة</li></ol></section>
            <section className="side-limits"><span>حدود المعالجة</span><p>حتى 30 ميجابايت للملف و12 ملفًا للأدوات المتعددة.</p></section>
            <Link href="/help">هل تحتاج مساعدة؟ <ArrowLeft size={15} /></Link>
          </aside>
        </div>

        <div className="tool-assurance-strip"><span><LockKeyhole size={15} /> معالجة مؤقتة</span><span><Zap size={15} /> دون تسجيل</span><span><FileCheck2 size={15} /> الملف الأصلي لا يتغير</span><span><Clock3 size={15} /> نتيجة مباشرة</span></div>
      </section>

      <section className="tool-after-grid shell">
        <div className="tool-faq-compact"><header><span className="eyebrow">معلومات مهمة</span><h2>أسئلة عن {tool.title}</h2></header><div>
          <details><summary>هل يتغير الملف الأصلي؟ <span>+</span></summary><p>لا. ينشئ سياق ملف نتيجة جديدًا للتنزيل، ويبقى الأصل كما هو على جهازك.</p></details>
          <details><summary>كيف أحصل على أفضل نتيجة؟ <span>+</span></summary><p>استخدم ملفًا سليمًا وغير تالف، واختر الإعدادات الضرورية فقط ثم راجع الناتج قبل اعتماده.</p></details>
          <details><summary>ماذا يحدث بعد انتهاء المعالجة؟ <span>+</span></summary><p>تتوقف الحاجة إلى مساحة العمل المؤقتة فور إرسال النتيجة، ولا يُضاف الملف إلى مكتبة دائمة.</p></details>
        </div></div>
        <div className="related-tools refined-related"><header><h2>أدوات مرتبطة</h2><Link href={`/tools/${tool.category}`}>القسم كاملًا <ArrowLeft size={15} /></Link></header><div>{related.map((item) => <Link href={`/tool/${item.slug}`} key={item.slug}><span className={`mini-tool-icon tone-${item.category}`}><ToolGlyph slug={item.slug} size={17} /></span><div><strong>{item.title}</strong><small>{item.short}</small></div><ArrowUpLeft size={16} /></Link>)}</div></div>
      </section>

      <section className="tool-bottom-note shell"><div><ShieldCheck size={20} /><span><strong>خصوصيتك جزء من الأداة.</strong> نتحقق من نوع الملف قبل المعالجة ولا نكتب فوق نسختك الأصلية.</span></div><Link href="/security">مركز الأمان <ArrowLeft size={15} /></Link></section>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
