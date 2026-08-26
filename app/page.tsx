import Link from "next/link";
import {
  ArrowLeft, ArrowUpLeft, Check, Clock3, Cloud, FileCheck2,
  Layers3, LockKeyhole, MonitorSmartphone, ShieldCheck, Sparkles, Zap,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolFinder } from "@/components/tool-finder";
import { categories, categoryDescriptions, categoryLabels, tools } from "@/lib/content";
import { posts } from "@/lib/blog";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="home-hero shell">
        <div className="home-hero-copy">
          <span className="hero-kicker"><span>سياق</span> 100 أداة، تجربة واحدة</span>
          <h1>كل ما يحتاجه ملفك.<br /><em>في مكان واحد.</em></h1>
          <p>حوّل، رتّب، اضغط واحمِ مستنداتك من واجهة عربية واضحة تعمل بالسهولة نفسها على الكمبيوتر والهاتف.</p>
          <div className="hero-actions deep-actions">
            <Link href="#tools" className="primary-button">ابدأ بأداة <ArrowLeft size={18} /></Link>
            <Link href="/tool/merge-pdf" className="secondary-button">دمج PDF الآن</Link>
          </div>
          <div className="hero-proof"><span><Check size={15} /> بدون تسجيل</span><span><ShieldCheck size={15} /> معالجة مؤقتة</span><span><Zap size={15} /> يعمل على الهاتف</span></div>
        </div>

        <div className="home-hero-visual">
          <figure className="hero-image"><img src="/images/siaq-home-hero.webp" alt="ملفات مستندات وصور وجداول تمر عبر بوابة تحويل منظمة" fetchPriority="high" /></figure>
          <div className="hero-format-dock" aria-label="الصيغ المدعومة"><span>PDF</span><span>Word</span><span>Excel</span><span>PowerPoint</span><span>JPG</span><strong>{tools.length} أداة</strong></div>
        </div>
      </section>

      <div className="trust-strip deep-trust"><div className="shell"><span><LockKeyhole size={17} /> لا تخزين دائم</span><span><Clock3 size={17} /> خطوات أقصر</span><span><MonitorSmartphone size={17} /> كل الشاشات</span><span><Cloud size={17} /> جاهز للسحابة</span></div></div>

      <ToolFinder limit={16} />

      <section className="category-section shell">
        <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> حسب المهمة</span><h2>مساحات متخصصة،<br />وليست قائمة طويلة.</h2></div><p>كل قسم يجمع الأدوات المرتبطة في رحلة واحدة حتى لا تضيع بين الصيغ والخيارات.</p></div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const categoryTools = tools.filter((tool) => tool.category === category);
            return <Link href={`/tools/${category}`} className={`category-card category-${category}`} key={category}>
              <div className="category-top"><span>0{index + 1}</span><ArrowUpLeft size={18} /></div>
              <h3>{categoryLabels[category]}</h3><p>{categoryDescriptions[category]}</p>
              <div className="category-samples">{categoryTools.slice(0, 3).map((tool) => <span key={tool.slug}>{tool.title}</span>)}</div>
              <small>{categoryTools.length} أدوات</small>
            </Link>;
          })}
        </div>
      </section>

      <section className="experience-section">
        <div className="shell experience-grid">
          <div className="experience-copy"><span className="eyebrow light"><span className="eyebrow-line" /> من الملف إلى النتيجة</span><h2>مسار واضح، مهما كانت المهمة.</h2><p>رفع، تحقق، معالجة، ثم تنزيل. نعرض لك حالة كل خطوة، ونحافظ على الإعدادات الضرورية بالقرب من الملف بدل دفنها في نوافذ معقدة.</p><Link href="/tools">استكشف الأدوات <ArrowLeft size={17} /></Link></div>
          <div className="experience-visual">
            <figure><img src="/images/siaq-three-stage-workflow.webp" alt="مسار معالجة للملفات من ثلاث مراحل منظمة" /></figure>
            <div className="workflow-board">
              <div><span className="workflow-number">01</span><FileCheck2 size={22} /><strong>تحقق ذكي</strong></div>
              <div><span className="workflow-number">02</span><Layers3 size={22} /><strong>معالجة مضبوطة</strong></div>
              <div><span className="workflow-number">03</span><Zap size={22} /><strong>نتيجة جاهزة</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="platform-section shell">
        <div className="platform-main"><span className="eyebrow"><span className="eyebrow-line" /> مبني للثقة</span><h2>أعمق من زر تحويل.</h2><p>سياق يفصل واجهة الاستخدام عن محرك المعالجة، ويتحقق من امتداد الملف وتوقيعه وحجمه قبل العمل عليه.</p><div className="platform-points"><span><LockKeyhole size={18} /> تشفير أثناء النقل</span><span><ShieldCheck size={18} /> ملفات مؤقتة</span><span><FileCheck2 size={18} /> تحقق متعدد الطبقات</span></div><Link href="/security">مركز الأمان <ArrowLeft size={17} /></Link></div>
        <figure className="security-image"><img src="/images/siaq-security-vault.webp" alt="ملفات محمية داخل درع شفاف متعدد الطبقات" /></figure>
        <div className="platform-stats"><div><strong>100</strong><span>أداة ومسارًا</span></div><div><strong>99</strong><span>معالجة جاهزة</span></div><div><strong>30MB</strong><span>لكل ملف حاليًا</span></div><div><strong>RTL</strong><span>عربي من الأساس</span></div></div>
      </section>

      <section className="solution-gallery shell">
        <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> سياق في كل مكان</span><h2>اختر طريقة العمل.</h2></div><p>من مهمة سريعة على الهاتف إلى دفعة ملفات أو ربط داخل نظامك.</p></div>
        <div>
          <Link href="/tools/office"><figure><img src="/images/siaq-batch-processing.webp" alt="ملفات Word وExcel وPowerPoint في مساحة منظمة" /></figure><span>30 مسارًا للمستندات والجداول</span><h3>كل أدوات أوفيس</h3><ArrowUpLeft size={18} /></Link>
          <Link href="/tools/image"><figure><img src="/images/siaq-mobile-accessibility.webp" alt="تحويل الصور من الهاتف والكمبيوتر" /></figure><span>27 أداة لأشهر صيغ الصور</span><h3>معالجة الصور</h3><ArrowUpLeft size={18} /></Link>
          <Link href="/workflows"><figure><img src="/images/siaq-integrations-network.webp" alt="خطوات مترابطة لمعالجة الملفات" /></figure><span>مهام متعددة بخطوات واضحة</span><h3>مسارات العمل</h3><ArrowUpLeft size={18} /></Link>
        </div>
      </section>

      <section className="resource-section shell">
        <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> تعلّم أسرع</span><h2>دليل الملفات.</h2></div><Link href="/blog">كل المقالات <ArrowLeft size={17} /></Link></div>
        <div className="home-posts">{posts.slice(0, 3).map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug} className={index === 0 ? "home-post featured" : "home-post"}><div><span>{post.category}</span><small>{post.readTime}</small></div><h3>{post.title}</h3><p>{post.excerpt}</p><ArrowUpLeft size={18} /></Link>)}</div>
      </section>

      <section className="home-faq shell">
        <div><span className="eyebrow"><span className="eyebrow-line" /> أسئلة واضحة</span><h2>قبل أن تبدأ.</h2><p>إجابات مختصرة عن الملفات والخصوصية والتوافق.</p><Link href="/help">مركز المساعدة <ArrowLeft size={16} /></Link></div>
        <div className="faq-list">
          <details><summary>هل تبقى ملفاتي على الخادم؟ <PlusIcon /></summary><p>المحرك مصمم لمعالجة مؤقتة دون قاعدة بيانات للملفات، مع حذف مساحة العمل بعد انتهاء الاستجابة.</p></details>
          <details><summary>هل تعمل الأدوات على الهاتف؟ <PlusIcon /></summary><p>نعم، الواجهة متجاوبة بالكامل، وأزرار الرفع والإعدادات محسنة للمس والهواتف.</p></details>
          <details><summary>ما الصيغ التي يدعمها سياق؟ <PlusIcon /></summary><p>PDF وWord وExcel وPowerPoint وJPG وPNG وWebP، مع إضافة صيغ جديدة تدريجيًا.</p></details>
        </div>
      </section>

      <section className="deep-cta shell"><div><Sparkles size={23} /><span>ابدأ من الأداة، لا من الشرح.</span></div><h2>ملف واحد.<br />خطوة تالية واضحة.</h2><Link href="#tools">اختر أداتك <ArrowLeft size={18} /></Link></section>
      <SiteFooter />
    </main>
  );
}

function PlusIcon() { return <span aria-hidden="true">+</span>; }
