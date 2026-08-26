# سياق لتحويل الملفات

مشروع عربي متكامل بواجهة **Next.js + React** وخدمة معالجة مستقلة بـ**Python Django**. يحتوي الكتالوج على 146 أداة لملفات PDF وWord وExcel وPowerPoint والصور والبيانات، إضافة إلى مدونة ديناميكية ولوحة إدارة محمية.

## مكونات المشروع

- `app/` و`components/`: واجهة Next.js المتجاوبة.
- `lib/content.ts`: المصدر الموحد لبيانات الأدوات الـ146.
- `backend/`: واجهة Django ومعالجات PDF وOffice والصور.
- `backend/blog/`: المقالات، واجهة القراءة، ولوحة الإدارة.
- `render.yaml`: Blueprint ينشئ خدمتي الواجهة والمحرك على Render.
- `Dockerfile.frontend`: صورة إنتاج Next.js.
- `backend/Dockerfile`: صورة Django وتشمل LibreOffice وGhostscript وTesseract.

## التشغيل المحلي

شغّل المحرك أولًا:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_articles
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

ثم شغّل الواجهة من مجلد المشروع:

```bash
npm ci
SIAQ_API_INTERNAL_URL=http://127.0.0.1:8000/api/v1 npm run dev
```

يمكن أيضًا وضع `NEXT_PUBLIC_SIAQ_API_URL=http://localhost:8000/api/v1` للاتصال المباشر من المتصفح أثناء التطوير.

## النشر عبر Render Blueprint

1. ارفع هذا المجلد كاملًا إلى مستودع GitHub أو GitLab أو Bitbucket.
2. في Render اختر **New → Blueprint** ثم اربط المستودع.
3. سيقرأ Render ملف `render.yaml` من جذر المستودع وينشئ:
   - `siaq-web`: واجهة Next.js.
   - `siaq-api`: خدمة المعالجة ولوحة إدارة المقالات.
   - `siaq-db`: قاعدة PostgreSQL لحفظ المقالات وحساب الإدارة.
4. لا يلزم ربط أي نطاق مخصص؛ استخدم عناوين `*.onrender.com` التي ينشئها Render تلقائيًا.
5. أثناء إنشاء Blueprint أدخل كلمة مرور قوية في `DJANGO_SUPERUSER_PASSWORD`.
6. انتظر نجاح فحص `/` للواجهة و`/api/v1/health/` للخدمة.

## لوحة إدارة المقالات

- افتح رابط خدمة `siaq-api` ثم أضف `/admin/`.
- اسم المستخدم الافتراضي في Blueprint هو `admin`.
- من قسم **المقالات** يمكنك إضافة مقال، صورة غلاف، قسم، تاريخ نشر، حالة النشر، ومعلومات SEO.
- اترك خانة **الرابط المختصر** فارغة؛ سيُنشئها النظام تلقائيًا مع منع تكرار الروابط.
- يمكن استخدام Markdown داخل المحتوى، مثل `##` للعناوين و`-` للقوائم.

تتصل الواجهة بالمحرك عبر شبكة Render الداخلية؛ لذلك لا تحتاج إلى كتابة عنوان API داخل الكود أو كشف مفتاح سري. يضبط Blueprint مفتاح Django تلقائيًا.

> أدوات LibreOffice وOCR أثقل من واجهة الموقع، لذلك يستخدم المحرك خطة `starter` افتراضيًا. يمكن تغييرها في `render.yaml` حسب حجم الاستخدام.

## الاختبارات

```bash
npm run lint
npm run build
cd backend && python -m unittest -v tests.test_processors
```

تشمل النسخة الحالية 145 مسار معالجة يعمل فعليًا، مع أداة ترجمة واحدة مخطط لها، وخريطة موقع وروبوتات وبيانات منظمة لتحسين الظهور في محركات البحث.

## الأمان

- حد الملف الواحد 30MB، والمجموع 60MB، وحتى 12 ملفًا في الطلب.
- التحقق من الامتداد وتوقيع الملف قبل المعالجة.
- مساحة مؤقتة مستقلة لكل طلب تُحذف بعد تنزيل النتيجة.
- منع مسارات ZIP الخطرة وحد أقصى للمحتوى المستخرج.
- قاعدة البيانات مخصصة للمقالات وحساب الإدارة فقط، ولا تحفظ ملفات التحويل.

## خط ثمانية

الواجهة تستخدم خط ثمانية المرفوع من صاحب المشروع. ملف الترخيص الأصلي موجود في `licenses/THMANYAH-FONT-LICENSE.pdf`. لا تُعد توزيع ملفات الخط منفصلة عن المنتج ولا تنسب الخط إلى المشروع.
