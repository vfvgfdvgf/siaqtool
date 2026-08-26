export type ToolCategory = "pdf" | "office" | "image" | "convert" | "edit" | "smart";

export type Tool = {
  slug: string;
  title: string;
  short: string;
  category: ToolCategory;
  badge?: string;
  accept: string;
  multiple?: boolean;
  minFiles?: number;
};

export const categories: ToolCategory[] = ["pdf", "office", "image", "convert", "edit", "smart"];

export const categoryLabels: Record<ToolCategory, string> = {
  pdf: "أدوات PDF",
  office: "أدوات أوفيس",
  image: "أدوات الصور",
  convert: "تحويلات أخرى",
  edit: "تعديل وحماية",
  smart: "أدوات ذكية",
};

export const categoryDescriptions: Record<ToolCategory, string> = {
  pdf: "نظّم صفحات PDF واضغطها وأصلحها وجهّزها للمشاركة أو الأرشفة.",
  office: "حوّل بين Word وExcel وPowerPoint وPDF والصيغ المفتوحة من مساحة واحدة.",
  image: "حوّل الصور واضغطها واقصصها وعدّلها مع دعم أشهر صيغ الهاتف والويب.",
  convert: "حوّل صفحات الويب والنصوص والحزم والصور إلى ملفات أسهل للاستخدام.",
  edit: "أضف العلامات والتوقيع والحماية ونقّح البيانات الحساسة في مستندات PDF.",
  smart: "استخرج النص والجداول، ولخّص المستندات أو ترجمها بأدوات ذكية واضحة.",
};

const pdfTools: Tool[] = [
  { slug: "merge-pdf", title: "دمج PDF", short: "اجمع الملفات ورتّبها في مستند واحد.", category: "pdf", accept: ".pdf", multiple: true, minFiles: 2 },
  { slug: "split-pdf", title: "تقسيم PDF", short: "حوّل كل صفحة إلى ملف مستقل داخل ZIP.", category: "pdf", accept: ".pdf" },
  { slug: "compress-pdf", title: "ضغط PDF", short: "قلّل الحجم مع الحفاظ على وضوح مناسب.", category: "pdf", accept: ".pdf" },
  { slug: "organize-pdf", title: "تنظيم PDF", short: "رتّب الصفحات حسب التسلسل الذي تختاره.", category: "pdf", accept: ".pdf" },
  { slug: "rotate-pdf", title: "تدوير PDF", short: "صحّح اتجاه صفحات المستند دفعة واحدة.", category: "pdf", accept: ".pdf", multiple: true },
  { slug: "crop-pdf", title: "قص PDF", short: "قلّل الهوامش حول محتوى الصفحات.", category: "pdf", accept: ".pdf" },
  { slug: "repair-pdf", title: "إصلاح PDF", short: "أعد بناء الملفات القابلة للاستعادة.", category: "pdf", accept: ".pdf" },
  { slug: "pdfa", title: "PDF إلى PDF/A", short: "أنشئ نسخة ملائمة للأرشفة طويلة الأجل.", category: "pdf", accept: ".pdf" },
  { slug: "page-numbers", title: "ترقيم صفحات PDF", short: "أضف أرقامًا متسلسلة أسفل كل صفحة.", category: "pdf", accept: ".pdf" },
  { slug: "delete-pdf-pages", title: "حذف صفحات PDF", short: "احذف الصفحات المحددة وأبقِ بقية المستند.", category: "pdf", accept: ".pdf" },
  { slug: "extract-pdf-pages", title: "استخراج صفحات PDF", short: "أنشئ ملفًا جديدًا من نطاق صفحات محدد.", category: "pdf", accept: ".pdf" },
  { slug: "reorder-pdf-pages", title: "إعادة ترتيب PDF", short: "اكتب ترتيب الصفحات الذي تريده للنتيجة.", category: "pdf", accept: ".pdf" },
  { slug: "reverse-pdf-pages", title: "عكس ترتيب PDF", short: "اعكس الصفحات من الأخيرة إلى الأولى.", category: "pdf", accept: ".pdf" },
  { slug: "duplicate-pdf-pages", title: "تكرار صفحات PDF", short: "كرّر صفحات محددة داخل نسخة جديدة.", category: "pdf", accept: ".pdf" },
  { slug: "grayscale-pdf", title: "PDF أبيض وأسود", short: "حوّل ألوان الصفحات إلى تدرج رمادي.", category: "pdf", accept: ".pdf" },
  { slug: "flatten-pdf", title: "تسطيح PDF", short: "ثبّت التعليقات والطبقات في صفحات مسطحة.", category: "pdf", accept: ".pdf" },
  { slug: "remove-pdf-metadata", title: "حذف بيانات PDF", short: "أزل العنوان والمؤلف وخصائص الملف الداخلية.", category: "pdf", accept: ".pdf" },
  { slug: "add-blank-pdf-page", title: "إضافة صفحة فارغة", short: "أضف صفحة بيضاء في نهاية مستند PDF.", category: "pdf", accept: ".pdf" },
];

const officeTools: Tool[] = [
  { slug: "pdf-to-word", title: "PDF إلى Word", short: "استخرج النص والجداول إلى DOCX قابل للتعديل.", category: "office", accept: ".pdf" },
  { slug: "word-to-pdf", title: "Word إلى PDF", short: "ثبّت تنسيق DOC وDOCX في ملف PDF.", category: "office", accept: ".doc,.docx" },
  { slug: "pdf-to-excel", title: "PDF إلى Excel", short: "استخرج محتوى الصفحات إلى أوراق XLSX.", category: "office", accept: ".pdf" },
  { slug: "excel-to-pdf", title: "Excel إلى PDF", short: "حوّل جداول XLS وXLSX إلى صفحات واضحة.", category: "office", accept: ".xls,.xlsx" },
  { slug: "pdf-to-powerpoint", title: "PDF إلى PowerPoint", short: "حوّل كل صفحة إلى شريحة PPTX منظمة.", category: "office", accept: ".pdf" },
  { slug: "powerpoint-to-pdf", title: "PowerPoint إلى PDF", short: "صدّر PPT وPPTX كملف ثابت للمشاركة.", category: "office", accept: ".ppt,.pptx" },
  { slug: "excel-to-word", title: "Excel إلى Word", short: "انقل الجداول من XLSX إلى مستند DOCX.", category: "office", badge: "مطلوب", accept: ".xls,.xlsx,.csv" },
  { slug: "word-to-excel", title: "Word إلى Excel", short: "حوّل فقرات وجداول DOCX إلى أوراق XLSX.", category: "office", badge: "مطلوب", accept: ".doc,.docx" },
  { slug: "word-to-powerpoint", title: "Word إلى PowerPoint", short: "حوّل العناوين والفقرات إلى شرائح PPTX.", category: "office", accept: ".doc,.docx" },
  { slug: "powerpoint-to-word", title: "PowerPoint إلى Word", short: "اجمع نصوص الشرائح داخل مستند DOCX.", category: "office", accept: ".ppt,.pptx" },
  { slug: "excel-to-powerpoint", title: "Excel إلى PowerPoint", short: "حوّل كل ورقة إلى شرائح عرض مختصرة.", category: "office", accept: ".xls,.xlsx" },
  { slug: "powerpoint-to-excel", title: "PowerPoint إلى Excel", short: "استخرج نصوص الشرائح إلى جدول XLSX.", category: "office", accept: ".ppt,.pptx" },
  { slug: "doc-to-docx", title: "DOC إلى DOCX", short: "حدّث مستند Word القديم إلى الصيغة الحديثة.", category: "office", accept: ".doc" },
  { slug: "docx-to-doc", title: "DOCX إلى DOC", short: "أنشئ نسخة متوافقة مع إصدارات Word القديمة.", category: "office", accept: ".docx" },
  { slug: "xls-to-xlsx", title: "XLS إلى XLSX", short: "حدّث مصنف Excel القديم إلى الصيغة الحديثة.", category: "office", accept: ".xls" },
  { slug: "xlsx-to-xls", title: "XLSX إلى XLS", short: "أنشئ نسخة متوافقة مع برامج الجداول القديمة.", category: "office", accept: ".xlsx" },
  { slug: "ppt-to-pptx", title: "PPT إلى PPTX", short: "حدّث العرض القديم إلى صيغة PowerPoint الحديثة.", category: "office", accept: ".ppt" },
  { slug: "pptx-to-ppt", title: "PPTX إلى PPT", short: "أنشئ نسخة من العرض للأجهزة الأقدم.", category: "office", accept: ".pptx" },
  { slug: "odt-to-docx", title: "ODT إلى DOCX", short: "حوّل مستند OpenDocument إلى Word.", category: "office", accept: ".odt" },
  { slug: "docx-to-odt", title: "DOCX إلى ODT", short: "حوّل Word إلى صيغة مستند مفتوحة.", category: "office", accept: ".docx" },
  { slug: "ods-to-xlsx", title: "ODS إلى XLSX", short: "حوّل جدول OpenDocument إلى Excel.", category: "office", accept: ".ods" },
  { slug: "xlsx-to-ods", title: "XLSX إلى ODS", short: "حوّل Excel إلى صيغة جداول مفتوحة.", category: "office", accept: ".xlsx" },
  { slug: "odp-to-pptx", title: "ODP إلى PPTX", short: "حوّل العرض المفتوح إلى PowerPoint.", category: "office", accept: ".odp" },
  { slug: "pptx-to-odp", title: "PPTX إلى ODP", short: "حوّل PowerPoint إلى صيغة عرض مفتوحة.", category: "office", accept: ".pptx" },
  { slug: "rtf-to-docx", title: "RTF إلى DOCX", short: "حوّل النص المنسق إلى مستند Word حديث.", category: "office", accept: ".rtf" },
  { slug: "docx-to-rtf", title: "DOCX إلى RTF", short: "أنشئ نسخة نصية منسقة واسعة التوافق.", category: "office", accept: ".docx" },
  { slug: "csv-to-excel", title: "CSV إلى Excel", short: "حوّل البيانات المفصولة إلى مصنف XLSX.", category: "office", accept: ".csv" },
  { slug: "excel-to-csv", title: "Excel إلى CSV", short: "صدّر أول ورقة من المصنف كبيانات CSV.", category: "office", accept: ".xls,.xlsx" },
  { slug: "text-to-word", title: "نص إلى Word", short: "حوّل TXT إلى مستند DOCX منسق.", category: "office", accept: ".txt" },
  { slug: "word-to-text", title: "Word إلى نص", short: "استخرج محتوى DOC وDOCX إلى TXT.", category: "office", accept: ".doc,.docx" },
];

const imageTools: Tool[] = [
  { slug: "compress-image", title: "ضغط الصور", short: "قلّل حجم JPG وPNG وWebP بجودة متوازنة.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "resize-image", title: "تغيير حجم الصور", short: "اضبط أكبر ضلع مع الحفاظ على التناسب.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "crop-image", title: "قص الصور", short: "قص الحواف بنسبة آمنة من كل جانب.", category: "image", accept: ".jpg,.jpeg,.png,.webp" },
  { slug: "rotate-image", title: "تدوير الصور", short: "دوّر الصورة 90 أو 180 أو 270 درجة.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "flip-image", title: "عكس الصور", short: "اعكس الصورة أفقيًا مع الحفاظ على الجودة.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "grayscale-image", title: "صور أبيض وأسود", short: "حوّل الألوان إلى تدرج رمادي نظيف.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "blur-image", title: "تمويه الصور", short: "طبّق تمويهًا خفيفًا على الصورة كاملة.", category: "image", accept: ".jpg,.jpeg,.png,.webp" },
  { slug: "sharpen-image", title: "تحسين حدة الصور", short: "زد وضوح الحواف والتفاصيل الدقيقة.", category: "image", accept: ".jpg,.jpeg,.png,.webp" },
  { slug: "watermark-image", title: "علامة مائية للصور", short: "أضف نصًا شفافًا فوق الصورة.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "remove-image-metadata", title: "حذف بيانات الصور", short: "أزل EXIF والموقع وخصائص الكاميرا.", category: "image", accept: ".jpg,.jpeg,.png,.webp", multiple: true },
  { slug: "image-metadata", title: "قراءة بيانات الصور", short: "استخرج أبعاد الصورة وبيانات EXIF إلى JSON.", category: "image", accept: ".jpg,.jpeg,.png,.webp,.heic,.heif" },
  { slug: "jpg-to-png", title: "JPG إلى PNG", short: "حوّل JPEG إلى PNG واسع التوافق.", category: "image", accept: ".jpg,.jpeg", multiple: true },
  { slug: "png-to-jpg", title: "PNG إلى JPG", short: "حوّل PNG إلى JPG أخف للمشاركة.", category: "image", accept: ".png", multiple: true },
  { slug: "webp-to-jpg", title: "WebP إلى JPG", short: "حوّل صور الويب إلى JPG.", category: "image", accept: ".webp", multiple: true },
  { slug: "jpg-to-webp", title: "JPG إلى WebP", short: "أنشئ نسخة WebP محسّنة للويب.", category: "image", accept: ".jpg,.jpeg", multiple: true },
  { slug: "png-to-webp", title: "PNG إلى WebP", short: "حوّل PNG إلى WebP مع الشفافية.", category: "image", accept: ".png", multiple: true },
  { slug: "webp-to-png", title: "WebP إلى PNG", short: "حوّل WebP إلى PNG مع الحفاظ على الشفافية.", category: "image", accept: ".webp", multiple: true },
  { slug: "heic-to-jpg", title: "HEIC إلى JPG", short: "حوّل صور iPhone إلى JPG.", category: "image", accept: ".heic,.heif", multiple: true },
  { slug: "heic-to-png", title: "HEIC إلى PNG", short: "حوّل صور iPhone إلى PNG.", category: "image", accept: ".heic,.heif", multiple: true },
  { slug: "svg-to-png", title: "SVG إلى PNG", short: "صدّر الرسومات المتجهة كصورة PNG.", category: "image", accept: ".svg", multiple: true },
  { slug: "svg-to-jpg", title: "SVG إلى JPG", short: "حوّل SVG إلى صورة JPG بخلفية بيضاء.", category: "image", accept: ".svg", multiple: true },
  { slug: "bmp-to-jpg", title: "BMP إلى JPG", short: "حوّل الصور النقطية القديمة إلى JPG.", category: "image", accept: ".bmp", multiple: true },
  { slug: "tiff-to-jpg", title: "TIFF إلى JPG", short: "حوّل صور المسح عالية الجودة إلى JPG.", category: "image", accept: ".tif,.tiff", multiple: true },
  { slug: "gif-to-jpg", title: "GIF إلى JPG", short: "استخرج الإطار الأول كصورة JPG.", category: "image", accept: ".gif", multiple: true },
  { slug: "avif-to-jpg", title: "AVIF إلى JPG", short: "حوّل AVIF الحديث إلى JPG متوافق.", category: "image", accept: ".avif", multiple: true },
  { slug: "png-to-ico", title: "PNG إلى ICO", short: "أنشئ أيقونة متعددة الأحجام من PNG.", category: "image", accept: ".png" },
  { slug: "jpg-to-ico", title: "JPG إلى ICO", short: "حوّل صورة JPG إلى أيقونة ICO.", category: "image", accept: ".jpg,.jpeg" },
];

const convertTools: Tool[] = [
  { slug: "jpg-to-pdf", title: "صور إلى PDF", short: "اجمع JPG وPNG وWebP في ملف PDF مرتب.", category: "convert", accept: ".jpg,.jpeg,.png,.webp,.heic,.heif", multiple: true },
  { slug: "pdf-to-jpg", title: "PDF إلى JPG", short: "حوّل كل صفحة إلى صورة JPG داخل ZIP.", category: "convert", accept: ".pdf" },
  { slug: "pdf-to-png", title: "PDF إلى PNG", short: "حوّل صفحات PDF إلى صور PNG واضحة.", category: "convert", accept: ".pdf" },
  { slug: "scan-to-pdf", title: "مسح إلى PDF", short: "اجمع صور المستند الممسوح في PDF.", category: "convert", accept: ".jpg,.jpeg,.png,.webp,.heic,.heif", multiple: true },
  { slug: "html-to-pdf", title: "HTML إلى PDF", short: "حوّل ملف صفحة ويب إلى مستند PDF.", category: "convert", accept: ".html,.htm" },
  { slug: "markdown-to-pdf", title: "Markdown إلى PDF", short: "حوّل ملف MD النصي إلى PDF بسيط.", category: "convert", accept: ".md,.markdown,.txt" },
  { slug: "pdf-to-markdown", title: "PDF إلى Markdown", short: "استخرج محتوى الصفحات بصيغة Markdown.", category: "convert", accept: ".pdf" },
  { slug: "zip-files", title: "إنشاء ZIP", short: "اجمع حتى 12 ملفًا في حزمة ZIP واحدة.", category: "convert", accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.txt,.csv", multiple: true, minFiles: 2 },
  { slug: "unzip-files", title: "فك ZIP", short: "استخرج محتويات ZIP الآمنة إلى حزمة جديدة.", category: "convert", accept: ".zip" },
  { slug: "file-hash", title: "بصمة الملف", short: "أنشئ بصمات SHA-256 للتحقق من سلامة الملفات.", category: "convert", accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.zip,.txt,.csv", multiple: true },
];

const editTools: Tool[] = [
  { slug: "edit-pdf", title: "تعديل PDF", short: "أضف نصًا أو صورة في موضع تختاره.", category: "edit", accept: ".pdf" },
  { slug: "sign-pdf", title: "توقيع PDF", short: "أضف اسم الموقّع وختم التاريخ إلى المستند.", category: "edit", accept: ".pdf" },
  { slug: "watermark", title: "علامة مائية PDF", short: "ضع نصًا شفافًا على جميع الصفحات.", category: "edit", accept: ".pdf" },
  { slug: "unlock-pdf", title: "فتح PDF", short: "أزل كلمة مرور ملف تملك صلاحيته.", category: "edit", accept: ".pdf" },
  { slug: "protect-pdf", title: "حماية PDF", short: "شفّر المستند بكلمة مرور AES-256.", category: "edit", accept: ".pdf" },
  { slug: "redact-pdf", title: "تنقيح PDF", short: "غطِّ منطقة حساسة بصورة دائمة على الصفحات.", category: "edit", accept: ".pdf" },
  { slug: "pdf-forms", title: "نماذج PDF", short: "اكتشف الحقول واملأ النماذج التفاعلية.", category: "edit", accept: ".pdf" },
  { slug: "add-header-footer", title: "رأس وتذييل PDF", short: "أضف نصًا ثابتًا أعلى وأسفل الصفحات.", category: "edit", accept: ".pdf" },
  { slug: "stamp-pdf", title: "ختم PDF", short: "أضف ختم مراجعة أو اعتماد إلى كل صفحة.", category: "edit", accept: ".pdf" },
  { slug: "compare-pdf", title: "مقارنة PDF", short: "أنشئ تقريرًا بالفروقات بين ملفين.", category: "edit", accept: ".pdf", multiple: true, minFiles: 2 },
];

const smartTools: Tool[] = [
  { slug: "ocr-pdf", title: "OCR PDF", short: "حوّل الصفحات الممسوحة إلى نص عربي قابل للبحث.", category: "smart", badge: "ذكي", accept: ".pdf" },
  { slug: "image-to-text", title: "صورة إلى نص", short: "استخرج النص العربي والإنجليزي من صورة.", category: "smart", badge: "ذكي", accept: ".jpg,.jpeg,.png,.webp,.heic,.heif" },
  { slug: "extract-tables-pdf", title: "استخراج جداول PDF", short: "حوّل الجداول المكتشفة إلى مصنف Excel.", category: "smart", badge: "ذكي", accept: ".pdf" },
  { slug: "summarize-pdf", title: "تلخيص PDF", short: "استخرج أهم النقاط من المستند الطويل.", category: "smart", badge: "ذكاء اصطناعي", accept: ".pdf" },
  { slug: "translate-pdf", title: "ترجمة PDF", short: "ترجم النص مع إنشاء ملف نتيجة جديد.", category: "smart", badge: "ذكاء اصطناعي", accept: ".pdf" },
];

export const tools: Tool[] = [...pdfTools, ...officeTools, ...imageTools, ...convertTools, ...editTools, ...smartTools];

export const popularSlugs = ["merge-pdf", "compress-pdf", "pdf-to-word", "word-to-pdf", "excel-to-word", "jpg-to-pdf", "compress-image", "pdf-to-jpg"];
export const popularTools = popularSlugs.map((slug) => tools.find((tool) => tool.slug === slug)!).filter(Boolean);
export function getTool(slug: string) { return tools.find((tool) => tool.slug === slug); }

const specializedToolSlugs = new Set(["translate-pdf"]);
export const availableToolSlugs = new Set(tools.filter((tool) => !specializedToolSlugs.has(tool.slug)).map((tool) => tool.slug));
