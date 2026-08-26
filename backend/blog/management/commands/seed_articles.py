from datetime import datetime

from django.core.management.base import BaseCommand
from django.utils import timezone

from blog.models import Article


ARTICLES = [
    {
        "slug": "smaller-pdf-without-losing-quality",
        "title": "كيف تصغّر PDF دون أن تفسد جودته؟",
        "excerpt": "افهم الفرق بين ضغط الصور وتنظيف البيانات الزائدة قبل اختيار مستوى الضغط.",
        "category": "PDF",
        "reading_minutes": 3,
        "is_featured": True,
        "published_at": "2026-08-26T09:00:00",
        "cover_image_url": "/images/siaq-knowledge-hub.webp",
        "content": """حجم ملف PDF لا يعتمد على عدد الصفحات فقط. الصور عالية الدقة والخطوط المضمّنة والطبقات غير المستخدمة قد تجعل مستندًا قصيرًا أثقل من كتاب كامل.

## ابدأ بالهدف

للمشاركة عبر البريد يكفي غالبًا وضوح متوسط للصور، أما الطباعة فتحتاج دقة أعلى. اختيار مستوى ضغط واحد لكل الحالات هو أكثر سبب شائع لنتيجة غير مرضية.

## احتفظ بالأصل

اعمل دائمًا على نسخة، ثم افتح الناتج وراجع النصوص الصغيرة والصور والجداول قبل إرساله.""",
    },
    {
        "slug": "pdf-or-word",
        "title": "PDF أم وورد: أي صيغة ترسل؟",
        "excerpt": "قاعدة بسيطة تساعدك على اختيار الصيغة المناسبة للتعديل أو المشاركة أو الطباعة.",
        "category": "دليل سريع",
        "reading_minutes": 2,
        "published_at": "2026-08-24T09:00:00",
        "cover_image_url": "/images/siaq-tool-library.webp",
        "content": """اختر Word عندما تريد من الطرف الآخر تعديل المحتوى، واختر PDF عندما تريد أن يصل المستند بالشكل نفسه تقريبًا على كل جهاز.

## للمراجعة المشتركة

صيغة DOCX أفضل للتعليقات وتتبع التغييرات. بعد اعتماد النسخة صدّرها إلى PDF للمشاركة النهائية أو الطباعة.

## للجداول والنماذج

اختبر الملف بعد التحويل؛ فالصفحات العريضة والخطوط غير الشائعة قد تتغير.""",
    },
    {
        "slug": "safe-file-conversion",
        "title": "قبل أن ترفع ملفًا حساسًا",
        "excerpt": "ثلاثة أسئلة سريعة عن الحذف والتشفير والوصول تساعدك على اختيار أداة آمنة.",
        "category": "أمان",
        "reading_minutes": 4,
        "published_at": "2026-08-21T09:00:00",
        "cover_image_url": "/images/siaq-security-vault.webp",
        "content": """قد يحتوي المستند على أرقام هوية أو عقود أو بيانات مالية أو معلومات مخفية ضمن خصائص الملف.

## قلّل ما ترفعه

احذف الصفحات غير المطلوبة والمعلومات الحساسة قبل الرفع، واستخدم كلمة مرور عند مشاركة الناتج.

## راجع النتيجة

افتح الملف الناتج وتأكد من إزالة البيانات التي لا تريد مشاركتها قبل الإرسال.""",
    },
    {
        "slug": "arabic-ocr-clean-results",
        "title": "OCR عربي بنتيجة قابلة للاستخدام",
        "excerpt": "كيف تهيئ المسح الضوئي لتقليل أخطاء الحروف والأرقام قبل استخراج النص.",
        "category": "OCR",
        "reading_minutes": 4,
        "published_at": "2026-08-19T09:00:00",
        "cover_image_url": "/images/siaq-smart-workspace.webp",
        "content": """التعرّف الضوئي يقرأ ما يراه؛ لذلك تتحول الصفحة المائلة أو الظلال والدقة المنخفضة مباشرة إلى أخطاء في النص.

## جهّز الصفحة

استخدم دقة مناسبة للنص، وافرد الورقة، واقص الحواف الداكنة وصحّح اتجاه الصفحات قبل الاستخراج.

## راجع ما يهم

دقق الأرقام والأسماء والتواريخ، ولا تعتمد على النتيجة وحدها في المستندات الحساسة.""",
    },
    {
        "slug": "excel-to-pdf-layout",
        "title": "إكسيل إلى PDF دون صفحات مبعثرة",
        "excerpt": "اضبط منطقة الطباعة والعرض والهوامش لتحصل على جدول واضح من أول محاولة.",
        "category": "إكسيل",
        "reading_minutes": 3,
        "published_at": "2026-08-16T09:00:00",
        "cover_image_url": "/images/siaq-batch-processing.webp",
        "content": """غالبًا لا تكون مشكلة التحويل في الملف بل في إعداد الصفحة. الجدول الذي يبدو جيدًا على الشاشة قد ينقسم عند الطباعة.

## حدّد النطاق

اختر الخلايا المطلوبة كمنطقة طباعة واضبط الاتجاه إلى أفقي للجداول العريضة.

## ثبّت العناوين

كرر صف العناوين في الصفحات الطويلة وراجع فواصل الصفحات قبل التصدير.""",
    },
    {
        "slug": "protect-pdf-correctly",
        "title": "متى تحمي PDF بكلمة مرور؟",
        "excerpt": "الفرق بين تشفير الملف وتقييد التعديل وإخفاء البيانات الحساسة فعليًا.",
        "category": "أمان",
        "reading_minutes": 3,
        "published_at": "2026-08-12T09:00:00",
        "cover_image_url": "/images/siaq-security-vault.webp",
        "content": """كلمة المرور تحمي الوصول إلى الملف أثناء التخزين والمشاركة، لكنها لا تمنع المستلم المصرح له من تصوير المحتوى بعد فتحه.

## اختر كلمة قوية

استخدم عبارة طويلة وفريدة وأرسلها في قناة مختلفة عن قناة إرسال المستند.

## الحذف ليس تغطية

إذا أردت إزالة معلومة نهائيًا فاستخدم التنقيح الحقيقي لا مستطيلاً فوق النص.""",
    },
]


class Command(BaseCommand):
    help = "إضافة المقالات الأساسية في قاعدة بيانات جديدة"

    def handle(self, *args, **options):
        if Article.objects.exists():
            self.stdout.write("Articles already exist; skipping seed.")
            return
        for item in ARTICLES:
            data = item.copy()
            published_at = timezone.make_aware(datetime.fromisoformat(data.pop("published_at")))
            Article.objects.create(**data, published_at=published_at)
        self.stdout.write(self.style.SUCCESS(f"Created {len(ARTICLES)} starter articles."))
