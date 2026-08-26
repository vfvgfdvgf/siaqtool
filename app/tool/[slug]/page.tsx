import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronLeft, FileCheck2, Gauge, Layers3, LockKeyhole, ShieldCheck, Zap } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UploadZone } from "@/components/upload-zone";
import { ToolGlyph } from "@/components/tool-glyph";
import { availableToolSlugs, categoryLabels, getTool, tools } from "@/lib/content";

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return { title: tool.title, description: `${tool.short} أداة عربية بسيطة من سياق.` };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3);
  const formats = tool.accept.split(",").map((format) => format.replace(".", "").toUpperCase());
  const isReady = availableToolSlugs.has(tool.slug);

  return (
    <main>
      <SiteHeader />
      <section className="tool-hero shell">
        <nav className="breadcrumb" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><ChevronLeft size={14} /><span>{categoryLabels[tool.category]}</span></nav>
        <div className="tool-heading">
          <div><span className="eyebrow">{categoryLabels[tool.category]}</span><h1>{tool.title}</h1><p>{tool.short} اضبط الخيارات الضرورية فقط، وسيتولى سياق بقية الخطوات.</p></div>
          <span className={`tool-file-icon tone-${tool.category}`} aria-hidden="true"><ToolGlyph slug={tool.slug} size={34} /></span>
        </div>
        <div className="tool-workspace-layout">
          <UploadZone accept={tool.accept} multiple={tool.multiple} minFiles={tool.minFiles} toolTitle={tool.title} toolSlug={tool.slug} ready={isReady} />
          <aside className="tool-side-panel">
            <div><span className={isReady ? "side-status ready" : "side-status"}>{isReady ? "جاهزة الآن" : "قريبًا"}</span><small>حالة الأداة</small></div>
            <div><strong>الصيغ المقبولة</strong><div className="format-pills">{formats.map((format) => <span key={format}>{format}</span>)}</div></div>
            <div><strong>حدود المعالجة</strong><p>حتى 30 ميجابايت للملف، و12 ملفًا للأدوات المتعددة.</p></div>
            <Link href="/help">هل تحتاج مساعدة؟ <ArrowLeft size={15} /></Link>
          </aside>
        </div>
        <div className="workspace-meta"><span><LockKeyhole size={15} /> اتصال آمن</span><span><Zap size={15} /> حالات واضحة</span><span><CheckCircle2 size={15} /> بدون تسجيل</span></div>
      </section>

      <section className="how-it-works shell" aria-label="طريقة الاستخدام">
        <div><span>01</span><strong>اختر الملف</strong><p>من جهازك مباشرة.</p></div>
        <div><span>02</span><strong>اضبط الإعدادات</strong><p>حسب نوع الأداة.</p></div>
        <div><span>03</span><strong>نزّل النتيجة</strong><p>بعد اكتمال المعالجة.</p></div>
      </section>

      <section className="tool-depth-section">
        <div className="shell tool-depth-grid">
          <div className="tool-depth-copy"><span className="eyebrow light">مصمم لهذه المهمة</span><h2>تحكم كافٍ،<br />دون ازدحام.</h2><p>تعرض الصفحة الخيارات المتعلقة بـ{tool.title} فقط. يبقى الملف الأصلي كما هو، وتُنزل النتيجة كملف جديد.</p></div>
          <div className="tool-benefits"><article><FileCheck2 size={22} /><strong>تحقق قبل البدء</strong><p>نتأكد من الصيغة والحجم قبل إرسال المهمة.</p></article><article><Gauge size={22} /><strong>حالة لحظية</strong><p>رفع ومعالجة ونجاح أو خطأ دون غموض.</p></article><article><Layers3 size={22} /><strong>خيارات مناسبة</strong><p>إعدادات مرتبطة بالأداة بدل لوحة عامة معقدة.</p></article><article><ShieldCheck size={22} /><strong>نتيجة منفصلة</strong><p>لا نكتب فوق الملف الأصلي على جهازك.</p></article></div>
        </div>
      </section>

      <section className="tool-faq-section shell">
        <div><span className="eyebrow">قبل المعالجة</span><h2>أسئلة عن {tool.title}</h2></div>
        <div className="faq-list"><details><summary>هل يتغير الملف الأصلي؟ <span>+</span></summary><p>لا. تُنشأ نتيجة جديدة للتنزيل ويبقى الملف الأصلي على جهازك كما هو.</p></details><details><summary>ماذا لو كان الملف محميًا؟ <span>+</span></summary><p>استخدم أداة فتح PDF أولًا إذا كنت تملك كلمة المرور والصلاحية، ثم أعد المحاولة.</p></details><details><summary>لماذا قد تختلف النتيجة؟ <span>+</span></summary><p>قد تؤثر الخطوط المضمنة أو الصور عالية الدقة أو بنية الملف التالفة. راجع الناتج قبل الاعتماد عليه.</p></details></div>
      </section>

      <section className="related-tools shell">
        <div className="related-head"><h2>قد تحتاج أيضًا</h2><Link href="/#tools">كل الأدوات <ArrowLeft size={16} /></Link></div>
        <div>{related.map((item) => <Link href={`/tool/${item.slug}`} key={item.slug}><span>{item.title}</span><small>{item.short}</small><ArrowLeft size={17} /></Link>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
