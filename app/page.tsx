import Link from "next/link";
import {
  ArrowLeft, ArrowUpLeft, CheckCircle2, FileCheck2, Gauge, LockKeyhole,
  MonitorSmartphone, ShieldCheck, Zap,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolFinder } from "@/components/tool-finder";
import { ToolGlyph } from "@/components/tool-glyph";
import { categories, categoryDescriptions, categoryLabels, tools } from "@/lib/content";
import { getPosts } from "@/lib/blog";

const quickTools = ["merge-pdf", "compress-pdf", "pdf-to-word", "word-to-pdf", "excel-to-word", "compress-image", "jpg-to-pdf", "image-to-text"]
  .map((slug) => tools.find((tool) => tool.slug === slug)!)
  .filter(Boolean);

const faq = [
  { question: "هل أحتاج إلى إنشاء حساب؟", answer: "لا. يمكنك اختيار الأداة ورفع الملف وبدء المعالجة مباشرة دون تسجيل." },
  { question: "هل تُحفظ ملفاتي؟", answer: "تُستخدم الملفات أثناء المعالجة المؤقتة فقط ولا تُضاف إلى قاعدة بيانات أو مكتبة دائمة." },
  { question: "هل تعمل الأدوات على الهاتف؟", answer: "نعم. صُممت مساحة الرفع والإعدادات والتنزيل لتعمل على الجوال والكمبيوتر." },
];

export default async function Home() {
  const articles = await getPosts(3);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "سياق",
        url: "https://getsiaq.com/",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        inLanguage: "ar",
        description: `منصة عربية تضم ${tools.length} أداة لتحويل وضغط وتنظيم ملفات PDF وأوفيس والصور.`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
      },
      {
        "@type": "ItemList",
        name: "أشهر أدوات سياق",
        itemListElement: quickTools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, url: `https://getsiaq.com/tool/${tool.slug}`, name: tool.title })),
      },
      { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };

  return (
    <main>
      <SiteHeader />

      <section className="workspace-hero shell">
        <div className="workspace-hero-main">
          <span className="hero-kicker"><span>جديد</span> {tools.length} أداة جاهزة لملفاتك</span>
          <h1>حوّل ملفك.<br /><em>وانتهِ أسرع.</em></h1>
          <p>PDF وWord وExcel وPowerPoint والصور والبيانات؛ مساحة عربية واحدة توصلك إلى النتيجة بأقل عدد من الخطوات.</p>
          <div className="workspace-hero-actions">
            <Link href="#tools" className="primary-button">ابحث عن أداتك <ArrowLeft size={17} /></Link>
            <Link href="/tool/merge-pdf" className="secondary-button">دمج PDF</Link>
          </div>
          <div className="workspace-proof"><span><CheckCircle2 size={16} /> دون تسجيل</span><span><ShieldCheck size={16} /> معالجة مؤقتة</span><span><MonitorSmartphone size={16} /> هاتف وكمبيوتر</span></div>
        </div>

        <aside className="instant-panel" aria-label="الأدوات الأكثر استخدامًا">
          <header><div><span>ابدأ مباشرة</span><h2>الأكثر استخدامًا</h2></div><small><i /> تعمل الآن</small></header>
          <div className="instant-tools">{quickTools.map((tool) => <Link href={`/tool/${tool.slug}`} key={tool.slug}><span><ToolGlyph slug={tool.slug} size={19} /></span><div><strong>{tool.title}</strong><small>{tool.accept.replaceAll(".", "").toUpperCase()}</small></div><ArrowUpLeft size={16} /></Link>)}</div>
          <Link className="instant-all" href="/tools">استعرض كل الأدوات <ArrowLeft size={15} /></Link>
        </aside>
      </section>

      <div className="format-ribbon"><div className="shell"><span>PDF</span><span>DOCX</span><span>XLSX</span><span>PPTX</span><span>JPG</span><span>PNG</span><span>WEBP</span><span>CSV</span><strong>+20 صيغة أخرى</strong></div></div>

      <ToolFinder limit={16} compact />

      <section className="home-category-hub shell" aria-labelledby="category-title">
        <div className="compact-section-head"><div><span className="eyebrow"><span className="eyebrow-line" /> تصفح حسب النوع</span><h2 id="category-title">ستة أقسام، دون تشتّت.</h2></div><p>كل أداة في مكان واضح، مع حالة التشغيل والصيغ المقبولة قبل رفع الملف.</p></div>
        <div className="compact-category-grid">
          {categories.map((category) => {
            const items = tools.filter((tool) => tool.category === category);
            return <Link href={`/tools/${category}`} className={`compact-category-card tone-${category}`} key={category}>
              <div><span className="compact-category-icon"><ToolGlyph slug={items[0].slug} size={21} /></span><small>{items.length} أداة</small></div>
              <h3>{categoryLabels[category]}</h3><p>{categoryDescriptions[category]}</p>
              <span className="category-inline-tools">{items.slice(0, 3).map((tool) => tool.title).join(" · ")}</span>
              <ArrowUpLeft size={17} />
            </Link>;
          })}
        </div>
      </section>

      <section className="home-operating-strip">
        <div className="shell">
          <article><span>01</span><FileCheck2 size={20} /><div><strong>اختر الملف</strong><p>نتحقق من الصيغة والحجم قبل البدء.</p></div></article>
          <article><span>02</span><Gauge size={20} /><div><strong>اضبط الضروري</strong><p>خيارات مرتبطة بالأداة فقط.</p></div></article>
          <article><span>03</span><Zap size={20} /><div><strong>نزّل النتيجة</strong><p>ملف جديد دون تغيير الأصل.</p></div></article>
          <article className="operating-security"><LockKeyhole size={20} /><div><strong>خصوصية واضحة</strong><p>لا أرشفة دائمة ولا حاجة إلى حساب.</p></div><Link href="/security">الأمان <ArrowLeft size={14} /></Link></article>
        </div>
      </section>

      <section className="home-lower-grid shell">
        <div className="home-insight-card">
          <span className="eyebrow"><span className="eyebrow-line" /> منصة عملية</span>
          <h2>المعلومة المهمة<br />تبقى بجوار المهمة.</h2>
          <p>نعرض الصيغ المقبولة، حدود الحجم، حالة الأداة، والإعدادات المطلوبة في مساحة واحدة حتى لا تتنقل بين شاشات إضافية.</p>
          <div><span><strong>{tools.length}</strong> أداة</span><span><strong>30MB</strong> لكل ملف</span><span><strong>12</strong> ملفًا دفعة واحدة</span></div>
          <Link href="/about">عن سياق <ArrowLeft size={15} /></Link>
        </div>
        <div className="home-articles">
          <header><div><span className="eyebrow"><span className="eyebrow-line" /> دليل الملفات</span><h2>اقرأ ما تحتاجه فقط.</h2></div><Link href="/blog">كل المقالات <ArrowLeft size={15} /></Link></header>
          <div>{articles.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><div><span>{post.category}</span><small>{post.readTime}</small></div><h3>{post.title}</h3><p>{post.excerpt}</p><ArrowUpLeft size={16} /></Link>)}</div>
        </div>
      </section>

      <section className="compact-faq shell" aria-labelledby="faq-title">
        <div><span className="eyebrow"><span className="eyebrow-line" /> إجابات سريعة</span><h2 id="faq-title">قبل رفع الملف.</h2><p>أهم ما تحتاج معرفته عن الاستخدام والخصوصية.</p></div>
        <div>{faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
