export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt?: string;
  readTime: string;
  category: string;
  author?: string;
  coverImage?: string;
  coverAlt?: string;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  bodyHtml?: string;
  paragraphs?: Array<{ heading?: string; text: string }>;
};

export const posts: Post[] = [
  {
    slug: "smaller-pdf-without-losing-quality",
    title: "كيف تصغّر PDF دون أن تفسد جودته؟",
    excerpt: "افهم الفرق بين ضغط الصور وتنظيف البيانات الزائدة قبل اختيار مستوى الضغط.",
    date: "26 أغسطس 2026",
    readTime: "3 دقائق",
    category: "PDF",
    author: "فريق سياق",
    featured: true,
    coverImage: "/images/siaq-knowledge-hub.webp",
    coverAlt: "أدلة منظمة تساعد على اختيار إعدادات الملفات",
    paragraphs: [
      { text: "حجم ملف PDF لا يعتمد على عدد الصفحات فقط. الصور عالية الدقة، والخطوط المضمّنة، والطبقات غير المستخدمة قد تجعل مستندًا قصيرًا أثقل من كتاب كامل." },
      { heading: "ابدأ بالهدف", text: "للمشاركة عبر البريد يكفي غالبًا وضوح متوسط للصور. أما الطباعة فتحتاج دقة أعلى. اختيار مستوى ضغط واحد لكل الحالات هو أكثر سبب شائع لنتيجة غير مرضية." },
      { heading: "احتفظ بالأصل", text: "اعمل دائمًا على نسخة، ثم افتح الناتج وراجع النصوص الصغيرة والصور والجداول قبل إرساله." },
    ],
  },
  {
    slug: "pdf-or-word",
    title: "PDF أم وورد: أي صيغة ترسل؟",
    excerpt: "قاعدة بسيطة تساعدك على اختيار الصيغة المناسبة للتعديل، المشاركة، أو الطباعة.",
    date: "24 أغسطس 2026",
    readTime: "دقيقتان",
    category: "دليل سريع",
    author: "فريق سياق",
    coverImage: "/images/siaq-tool-library.webp",
    coverAlt: "مكتبة صيغ وملفات مترابطة",
    paragraphs: [
      { text: "اختر وورد عندما تريد من الطرف الآخر تعديل المحتوى. واختر PDF عندما تريد أن يصل المستند بالشكل نفسه تقريبًا على كل جهاز." },
      { heading: "للمراجعة المشتركة", text: "DOCX أفضل للتعليقات وتتبّع التغييرات وتحرير الفقرات. بعد اعتماد النسخة، صدّرها إلى PDF للمشاركة النهائية أو الطباعة." },
      { heading: "للجداول والنماذج", text: "اختبر الملف بعد التحويل؛ الصفحات العريضة والخطوط غير الشائعة قد تتغير." },
    ],
  },
  {
    slug: "safe-file-conversion",
    title: "قبل أن ترفع ملفًا حساسًا",
    excerpt: "ثلاثة أسئلة سريعة عن الحذف والتشفير والوصول تساعدك على اختيار أداة آمنة.",
    date: "21 أغسطس 2026",
    readTime: "4 دقائق",
    category: "أمان",
    author: "فريق سياق",
    coverImage: "/images/siaq-security-vault.webp",
    coverAlt: "مستندات محفوظة داخل درع شفاف",
    paragraphs: [
      { text: "المستند قد يحتوي على أرقام هوية، عقود، بيانات مالية أو معلومات لا تظهر في الصفحة مثل خصائص الملف." },
      { heading: "قلّل ما ترفعه", text: "احذف الصفحات غير المطلوبة والمعلومات الحساسة قبل الرفع، واستخدم كلمة مرور عند مشاركة الناتج." },
      { heading: "راجع النتيجة", text: "افتح الملف الناتج وتأكد من إزالة البيانات التي لا تريد مشاركتها قبل الإرسال." },
    ],
  },
  {
    slug: "arabic-ocr-clean-results",
    title: "OCR عربي بنتيجة قابلة للاستخدام",
    excerpt: "كيف تهيئ المسح الضوئي لتقليل أخطاء الحروف والأرقام قبل استخراج النص.",
    date: "19 أغسطس 2026",
    readTime: "4 دقائق",
    category: "OCR",
    author: "فريق سياق",
    coverImage: "/images/siaq-smart-workspace.webp",
    coverAlt: "مسح مستند وتحويله إلى طبقات نص منظمة",
    paragraphs: [
      { text: "التعرّف الضوئي يقرأ ما يراه. الصفحة المائلة، والظل قرب التجليد، والدقة المنخفضة تتحول مباشرة إلى أخطاء في النص." },
      { heading: "جهّز الصفحة", text: "استخدم دقة مناسبة للنص، وافرد الورقة، واقص الحواف الداكنة وصحّح اتجاه الصفحات قبل الاستخراج." },
      { heading: "راجع ما يهم", text: "دقّق الأرقام والأسماء والتواريخ تحديدًا، ولا تعتمد على النتيجة وحدها في المستندات الحساسة." },
    ],
  },
  {
    slug: "excel-to-pdf-layout",
    title: "إكسيل إلى PDF دون صفحات مبعثرة",
    excerpt: "اضبط منطقة الطباعة والعرض والهوامش لتحصل على جدول واضح من أول محاولة.",
    date: "16 أغسطس 2026",
    readTime: "3 دقائق",
    category: "إكسيل",
    author: "فريق سياق",
    coverImage: "/images/siaq-batch-processing.webp",
    coverAlt: "دفعة مستندات تمر في مسار معالجة مرتب",
    paragraphs: [
      { text: "غالبًا لا تكون مشكلة التحويل في الملف، بل في إعداد الصفحة. الجدول الذي يبدو جيدًا على الشاشة قد ينقسم عند الطباعة." },
      { heading: "حدّد النطاق", text: "اختر الخلايا المطلوبة فقط كمنطقة طباعة، ثم اضبط الاتجاه إلى أفقي للجداول العريضة." },
      { heading: "ثبّت العناوين", text: "كرّر صف العناوين في الصفحات الطويلة، وراجع فواصل الصفحات قبل التصدير." },
    ],
  },
  {
    slug: "protect-pdf-correctly",
    title: "متى تحمي PDF بكلمة مرور؟",
    excerpt: "الفرق بين تشفير الملف، وتقييد التعديل، وإخفاء البيانات الحساسة فعليًا.",
    date: "12 أغسطس 2026",
    readTime: "3 دقائق",
    category: "أمان",
    author: "فريق سياق",
    coverImage: "/images/siaq-security-vault.webp",
    coverAlt: "درع لحماية المستندات",
    paragraphs: [
      { text: "كلمة المرور تحمي الوصول إلى الملف أثناء التخزين والمشاركة، لكنها لا تمنع المستلم المصرّح له من تصوير المحتوى بعد فتحه." },
      { heading: "اختر كلمة قوية", text: "استخدم عبارة طويلة وفريدة، وأرسلها في قناة مختلفة عن قناة إرسال المستند." },
      { heading: "الحذف ليس تغطية", text: "إذا أردت إزالة معلومة نهائيًا فاستخدم التنقيح الحقيقي، لا مستطيلًا فوق النص." },
    ],
  },
];

function apiBase() {
  if (process.env.SIAQ_API_INTERNAL_URL) return process.env.SIAQ_API_INTERNAL_URL.replace(/\/$/, "");
  if (process.env.SIAQ_API_HOST) return `http://${process.env.SIAQ_API_HOST}:${process.env.SIAQ_API_PORT || "10000"}/api/v1`;
  if (process.env.SIAQ_API_URL) return process.env.SIAQ_API_URL.replace(/\/$/, "");
  return null;
}

export async function getPosts(limit = 24): Promise<Post[]> {
  const base = apiBase();
  if (!base) return posts.slice(0, limit);
  try {
    const response = await fetch(`${base}/blog/articles/?limit=${limit}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return posts.slice(0, limit);
    const payload = await response.json() as { articles?: Post[] };
    return payload.articles?.length ? payload.articles : posts.slice(0, limit);
  } catch {
    return posts.slice(0, limit);
  }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const base = apiBase();
  if (base) {
    try {
      const response = await fetch(`${base}/blog/articles/${encodeURIComponent(slug)}/`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3500),
      });
      if (response.ok) {
        const payload = await response.json() as { article?: Post };
        if (payload.article) return payload.article;
      }
    } catch {
      // The editorial fallback keeps the public site available during maintenance.
    }
  }
  return posts.find((post) => post.slug === slug);
}
