import Link from "next/link";
import {
<<<<<<< HEAD
  ArrowLeft, ArrowUpLeft, Check, Clock3, FileCheck2, Layers3, LockKeyhole,
  MonitorSmartphone, ScanText, ShieldCheck, Sparkles, WandSparkles, Zap,
=======
  ArrowLeft, ArrowUpLeft, Check, Clock3, Cloud, FileCheck2,
  Layers3, LockKeyhole, MonitorSmartphone, ShieldCheck, Sparkles, Zap,
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolFinder } from "@/components/tool-finder";
<<<<<<< HEAD
import { ToolGlyph } from "@/components/tool-glyph";
import { categories, categoryDescriptions, categoryLabels, tools } from "@/lib/content";
import { getPosts } from "@/lib/blog";

const quickTools = ["merge-pdf", "compress-pdf", "pdf-to-word", "word-to-pdf", "compress-image", "image-to-text"]
  .map((slug) => tools.find((tool) => tool.slug === slug)!)
  .filter(Boolean);

export default async function Home() {
  const articles = await getPosts(3);
=======
import { categories, categoryDescriptions, categoryLabels, tools } from "@/lib/content";
import { posts } from "@/lib/blog";

export default function Home() {
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
  return (
    <main>
      <SiteHeader />

<<<<<<< HEAD
      <section className="home-hero shell" data-reveal>
        <div className="home-hero-copy">
          <span className="hero-kicker"><span>سياق</span> 100 أداة، تجربة عربية واحدة</span>
          <h1>كل ما يحتاجه ملفك.<br /><em>أوضح. أسرع.</em></h1>
          <p>حوّل، رتّب، اضغط واحمِ مستنداتك وصورك من مساحة واحدة مصممة لتوصلك إلى النتيجة بأقل عدد من الخطوات.</p>
          <div className="hero-actions deep-actions">
            <Link href="#tools" className="primary-button">اختر أداتك <ArrowLeft size={18} /></Link>
            <Link href="/tool/merge-pdf" className="secondary-button">دمج PDF الآن</Link>
          </div>
          <div className="hero-proof"><span><Check size={15} /> بدون تسجيل</span><span><ShieldCheck size={15} /> معالجة مؤقتة</span><span><Zap size={15} /> متوافق مع الهاتف</span></div>
        </div>

        <div className="home-hero-visual">
          <figure className="hero-image"><img src="/images/siaq-home-hero.webp" alt="ملفات وصور وجداول تمر في مسار تحويل منظم" fetchPriority="high" /></figure>
          <div className="hero-quick-tools" aria-label="أدوات سريعة">
            {quickTools.slice(0, 4).map((tool) => <Link href={`/tool/${tool.slug}`} key={tool.slug}><span><ToolGlyph slug={tool.slug} size={18} /></span><strong>{tool.title}</strong><ArrowUpLeft size={15} /></Link>)}
          </div>
=======
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
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
          <div className="hero-format-dock" aria-label="الصيغ المدعومة"><span>PDF</span><span>Word</span><span>Excel</span><span>PowerPoint</span><span>JPG</span><strong>{tools.length} أداة</strong></div>
        </div>
      </section>

<<<<<<< HEAD
      <div className="trust-strip deep-trust"><div className="shell"><span><LockKeyhole size={17} /> لا تخزين دائم</span><span><Clock3 size={17} /> خطوات أقصر</span><span><MonitorSmartphone size={17} /> يعمل على كل الشاشات</span><span><FileCheck2 size={17} /> نتيجة منفصلة</span></div></div>

      <section className="tool-library-banner shell" data-reveal>
        <figure><img src="/images/siaq-tool-library.webp" alt="مكتبة متصلة تضم وحدات للمستندات والصور والجداول" loading="lazy" decoding="async" /></figure>
        <div><span className="eyebrow"><span className="eyebrow-line" /> ابدأ من المهمة</span><h2>مكتبة مرتبة،<br />لا قائمة مربكة.</h2><p>اكتب ما تريد فعله أو اختر نوع الملف، وستظهر لك الأدوات المناسبة فورًا.</p><div><span>6 أقسام</span><span>100 أداة</span><span>بحث فوري</span></div></div>
      </section>

      <ToolFinder limit={12} />

      <section className="category-section shell" data-reveal>
        <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> حسب نوع المهمة</span><h2>لكل ملف،<br />مساحة مناسبة.</h2></div><p>كل قسم يجمع الأدوات المرتبطة في رحلة واضحة، مع أيقونة مخصصة تشرح وظيفة كل أداة من النظرة الأولى.</p></div>
=======
      <div className="trust-strip deep-trust"><div className="shell"><span><LockKeyhole size={17} /> لا تخزين دائم</span><span><Clock3 size={17} /> خطوات أقصر</span><span><MonitorSmartphone size={17} /> كل الشاشات</span><span><Cloud size={17} /> جاهز للسحابة</span></div></div>

      <ToolFinder limit={16} />

      <section className="category-section shell">
        <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> حسب المهمة</span><h2>مساحات متخصصة،<br />وليست قائمة طويلة.</h2></div><p>كل قسم يجمع الأدوات المرتبطة في رحلة واحدة حتى لا تضيع بين الصيغ والخيارات.</p></div>
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
        <div className="category-grid">
          {categories.map((category, index) => {
            const categoryTools = tools.filter((tool) => tool.category === category);
            return <Link href={`/tools/${category}`} className={`category-card category-${category}`} key={category}>
              <div className="category-top"><span>0{index + 1}</span><ArrowUpLeft size={18} /></div>
<<<<<<< HEAD
              <div className="category-art" aria-hidden="true">{categoryTools.slice(0, 3).map((tool) => <span key={tool.slug}><ToolGlyph slug={tool.slug} size={index === 0 ? 26 : 21} /></span>)}</div>
=======
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
              <h3>{categoryLabels[category]}</h3><p>{categoryDescriptions[category]}</p>
              <div className="category-samples">{categoryTools.slice(0, 3).map((tool) => <span key={tool.slug}>{tool.title}</span>)}</div>
              <small>{categoryTools.length} أدوات</small>
            </Link>;
          })}
        </div>
      </section>

<<<<<<< HEAD
      <section className="experience-section" data-reveal>
        <div className="shell experience-grid">
          <div className="experience-copy"><span className="eyebrow light"><span className="eyebrow-line" /> من الملف إلى النتيجة</span><h2>ثلاث خطوات.<br />لا مفاجآت.</h2><p>اختر الملف، راجع الإعدادات الضرورية، ثم نزّل النتيجة. تظهر لك حالة كل خطوة بوضوح وتبقى الخيارات قريبة من المهمة.</p><Link href="/tools">استكشف الأدوات <ArrowLeft size={17} /></Link></div>
          <div className="experience-visual">
            <figure><img src="/images/siaq-three-stage-workflow.webp" alt="مسار معالجة للملفات من ثلاث مراحل منظمة" loading="lazy" decoding="async" /></figure>
            <div className="workflow-board">
              <div><span className="workflow-number">01</span><FileCheck2 size={22} /><strong>تحقق من الملف</strong></div>
              <div><span className="workflow-number">02</span><Layers3 size={22} /><strong>خيارات واضحة</strong></div>
=======
      <section className="experience-section">
        <div className="shell experience-grid">
          <div className="experience-copy"><span className="eyebrow light"><span className="eyebrow-line" /> من الملف إلى النتيجة</span><h2>مسار واضح، مهما كانت المهمة.</h2><p>رفع، تحقق، معالجة، ثم تنزيل. نعرض لك حالة كل خطوة، ونحافظ على الإعدادات الضرورية بالقرب من الملف بدل دفنها في نوافذ معقدة.</p><Link href="/tools">استكشف الأدوات <ArrowLeft size={17} /></Link></div>
          <div className="experience-visual">
            <figure><img src="/images/siaq-three-stage-workflow.webp" alt="مسار معالجة للملفات من ثلاث مراحل منظمة" /></figure>
            <div className="workflow-board">
              <div><span className="workflow-number">01</span><FileCheck2 size={22} /><strong>تحقق ذكي</strong></div>
              <div><span className="workflow-number">02</span><Layers3 size={22} /><strong>معالجة مضبوطة</strong></div>
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
              <div><span className="workflow-number">03</span><Zap size={22} /><strong>نتيجة جاهزة</strong></div>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="smart-showcase shell" data-reveal>
        <figure><img src="/images/siaq-smart-workspace.webp" alt="مستند ممسوح يتحول إلى طبقات نص منظمة" loading="lazy" decoding="async" /></figure>
        <div><span className="eyebrow"><span className="eyebrow-line" /> أدوات ذكية</span><h2>حوّل الصورة<br />إلى معرفة.</h2><p>استخرج النصوص والجداول من الملفات الممسوحة، ولخّص المستندات الطويلة من مساحة بسيطة تبقي النتيجة في الواجهة.</p><div className="smart-links"><Link href="/tool/ocr-pdf"><ScanText size={18} /> OCR للمستندات <ArrowLeft size={16} /></Link><Link href="/tool/summarize-pdf"><WandSparkles size={18} /> تلخيص PDF <ArrowLeft size={16} /></Link></div></div>
      </section>

      <section className="platform-section shell" data-reveal>
        <div className="platform-main"><span className="eyebrow"><span className="eyebrow-line" /> خصوصية مفهومة</span><h2>الثقة تظهر<br />في كل خطوة.</h2><p>نتحقق من نوع الملف وحجمه قبل بدء العمل، وتبقى المعالجة مؤقتة مع إنشاء نتيجة جديدة دون الكتابة فوق ملفك الأصلي.</p><div className="platform-points"><span><LockKeyhole size={18} /> اتصال مشفّر</span><span><ShieldCheck size={18} /> ملفات مؤقتة</span><span><FileCheck2 size={18} /> تحقق قبل البدء</span></div><Link href="/security">مركز الأمان <ArrowLeft size={17} /></Link></div>
        <figure className="security-image"><img src="/images/siaq-security-vault.webp" alt="مستندات محمية داخل درع شفاف متعدد الطبقات" loading="lazy" decoding="async" /></figure>
        <div className="platform-stats"><div><strong>100</strong><span>أداة ومسارًا</span></div><div><strong>6</strong><span>أقسام واضحة</span></div><div><strong>30MB</strong><span>لكل ملف حاليًا</span></div><div><strong>RTL</strong><span>عربي من البداية</span></div></div>
      </section>

      <section className="solution-gallery shell" data-reveal>
        <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> سياق في كل مكان</span><h2>اختر طريقة العمل.</h2></div><p>من مهمة سريعة على الهاتف إلى دفعة مستندات تحتاج خطوات مرتبة.</p></div>
        <div>
          <Link href="/tools/office"><figure><img src="/images/siaq-batch-processing.webp" alt="ملفات Word وExcel وPowerPoint في مساحة منظمة" loading="lazy" decoding="async" /></figure><span>30 مسارًا للمستندات والجداول</span><h3>كل أدوات أوفيس</h3><ArrowUpLeft size={18} /></Link>
          <Link href="/tools/image"><figure><img src="/images/siaq-mobile-accessibility.webp" alt="تحويل الصور من الهاتف والكمبيوتر" loading="lazy" decoding="async" /></figure><span>27 أداة لأشهر صيغ الصور</span><h3>معالجة الصور</h3><ArrowUpLeft size={18} /></Link>
          <Link href="/workflows"><figure><img src="/images/siaq-integrations-network.webp" alt="خطوات مترابطة لمعالجة الملفات" loading="lazy" decoding="async" /></figure><span>مهام متعددة بخطوات واضحة</span><h3>مسارات العمل</h3><ArrowUpLeft size={18} /></Link>
        </div>
      </section>

      <section className="knowledge-section shell" data-reveal>
        <figure><img src="/images/siaq-knowledge-hub.webp" alt="مركز معرفة يضم أدلة ومجلدات مرتبطة" loading="lazy" decoding="async" /></figure>
        <div className="knowledge-content">
          <div className="section-head rich-head"><div><span className="eyebrow"><span className="eyebrow-line" /> تعلّم أسرع</span><h2>دليل ملفاتك.</h2></div><Link href="/blog">كل المقالات <ArrowLeft size={17} /></Link></div>
          <div className="home-posts">{articles.map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug} className={index === 0 ? "home-post featured" : "home-post"}><div><span>{post.category}</span><small>{post.readTime}</small></div><h3>{post.title}</h3><p>{post.excerpt}</p><ArrowUpLeft size={18} /></Link>)}</div>
        </div>
      </section>

      <section className="home-faq shell" data-reveal>
        <div><span className="eyebrow"><span className="eyebrow-line" /> أسئلة واضحة</span><h2>قبل أن تبدأ.</h2><p>إجابات مختصرة عن الملفات والخصوصية والتوافق.</p><Link href="/help">مركز المساعدة <ArrowLeft size={16} /></Link></div>
        <div className="faq-list">
          <details><summary>هل تبقى ملفاتي بعد انتهاء المهمة؟ <PlusIcon /></summary><p>لا تُستخدم الملفات كأرشيف دائم، وتُحذف مساحة العمل المؤقتة بعد اكتمال الاستجابة.</p></details>
          <details><summary>هل تعمل الأدوات على الهاتف؟ <PlusIcon /></summary><p>نعم، الواجهة متجاوبة بالكامل وأزرار الرفع والإعدادات محسنة للمس والشاشات الصغيرة.</p></details>
          <details><summary>ما الصيغ التي يدعمها سياق؟ <PlusIcon /></summary><p>PDF وWord وExcel وPowerPoint وJPG وPNG وWebP وصيغ أخرى موضحة داخل كل أداة.</p></details>
        </div>
      </section>

      <section className="deep-cta shell" data-reveal><div><Sparkles size={23} /><span>ابدأ من النتيجة التي تريدها.</span></div><h2>ملف واحد.<br />خطوة تالية واضحة.</h2><Link href="#tools">اختر أداتك <ArrowLeft size={18} /></Link></section>
=======
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
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
      <SiteFooter />
    </main>
  );
}

function PlusIcon() { return <span aria-hidden="true">+</span>; }
