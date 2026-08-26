# سياق لتحويل الملفات

<<<<<<< HEAD
مشروع عربي متكامل بواجهة **Next.js + React** وخدمة معالجة مستقلة بـ**Python Django**. يحتوي الكتالوج على 100 أداة لملفات PDF وWord وExcel وPowerPoint والصور، إضافة إلى مدونة ديناميكية ولوحة إدارة محمية.
=======
مشروع عربي متكامل بواجهة **Next.js + React** ومحرك معالجة مستقل بـ**Python Django**. يحتوي الكتالوج على 100 أداة لملفات PDF وWord وExcel وPowerPoint والصور، مع 99 مسار معالجة محلي في المحرك. أداة ترجمة PDF فقط تحتاج ربط مزود ترجمة خارجي قبل تفعيلها.
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40

## مكونات المشروع

- `app/` و`components/`: واجهة Next.js المتجاوبة.
- `lib/content.ts`: المصدر الموحد لبيانات الأدوات المئة.
- `backend/`: واجهة Django ومعالجات PDF وOffice والصور.
<<<<<<< HEAD
- `backend/blog/`: المقالات، واجهة القراءة، ولوحة الإدارة.
=======
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
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
<<<<<<< HEAD
python manage.py migrate
python manage.py seed_articles
python manage.py createsuperuser
=======
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
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
<<<<<<< HEAD
   - `siaq-api`: خدمة المعالجة ولوحة إدارة المقالات.
   - `siaq-db`: قاعدة PostgreSQL لحفظ المقالات وحساب الإدارة.
4. لا يلزم ربط أي نطاق مخصص؛ استخدم عناوين `*.onrender.com` التي ينشئها Render تلقائيًا.
5. أثناء إنشاء Blueprint أدخل كلمة مرور قوية في `DJANGO_SUPERUSER_PASSWORD`.
6. انتظر نجاح فحص `/` للواجهة و`/api/v1/health/` للخدمة.

## لوحة إدارة المقالات

- افتح رابط خدمة `siaq-api` ثم أضف `/admin/`.
- اسم المستخدم الافتراضي في Blueprint هو `admin`.
- من قسم **المقالات** يمكنك إضافة مقال، صورة غلاف، قسم، تاريخ نشر، حالة النشر، ومعلومات SEO.
- يمكن استخدام Markdown داخل المحتوى، مثل `##` للعناوين و`-` للقوائم.
=======
   - `siaq-api`: محرك Django داخل Docker.
4. لا يلزم ربط أي نطاق مخصص؛ استخدم عناوين `*.onrender.com` التي ينشئها Render تلقائيًا.
5. انتظر نجاح فحص `/` للواجهة و`/api/v1/health/` للمحرك. ويمكن إضافة نطاق مخصص لاحقًا بشكل اختياري من لوحة Render.
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40

تتصل الواجهة بالمحرك عبر شبكة Render الداخلية؛ لذلك لا تحتاج إلى كتابة عنوان API داخل الكود أو كشف مفتاح سري. يضبط Blueprint مفتاح Django تلقائيًا.

> أدوات LibreOffice وOCR أثقل من واجهة الموقع، لذلك يستخدم المحرك خطة `starter` افتراضيًا. يمكن تغييرها في `render.yaml` حسب حجم الاستخدام.

## الاختبارات

```bash
npm run build:render
cd backend && python -m unittest discover -s tests
```

## الأمان

- حد الملف الواحد 30MB، والمجموع 60MB، وحتى 12 ملفًا في الطلب.
- التحقق من الامتداد وتوقيع الملف قبل المعالجة.
- مساحة مؤقتة مستقلة لكل طلب تُحذف بعد تنزيل النتيجة.
- منع مسارات ZIP الخطرة وحد أقصى للمحتوى المستخرج.
<<<<<<< HEAD
- قاعدة البيانات مخصصة للمقالات وحساب الإدارة فقط، ولا تحفظ ملفات التحويل.
=======
- لا توجد قاعدة بيانات لحفظ ملفات المستخدمين.
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40

## خط ثمانية

الواجهة تستخدم خط ثمانية المرفوع من صاحب المشروع. ملف الترخيص الأصلي موجود في `licenses/THMANYAH-FONT-LICENSE.pdf`. لا تُعد توزيع ملفات الخط منفصلة عن المنتج ولا تنسب الخط إلى المشروع.
