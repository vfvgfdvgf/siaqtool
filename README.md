# سياق لتحويل الملفات

مشروع عربي متكامل بواجهة **Next.js + React** ومحرك معالجة مستقل بـ**Python Django**. يحتوي الكتالوج على 100 أداة لملفات PDF وWord وExcel وPowerPoint والصور، مع 99 مسار معالجة محلي في المحرك. أداة ترجمة PDF فقط تحتاج ربط مزود ترجمة خارجي قبل تفعيلها.

## مكونات المشروع

- `app/` و`components/`: واجهة Next.js المتجاوبة.
- `lib/content.ts`: المصدر الموحد لبيانات الأدوات المئة.
- `backend/`: واجهة Django ومعالجات PDF وOffice والصور.
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
   - `siaq-api`: محرك Django داخل Docker.
4. لا يلزم ربط أي نطاق مخصص؛ استخدم عناوين `*.onrender.com` التي ينشئها Render تلقائيًا.
5. انتظر نجاح فحص `/` للواجهة و`/api/v1/health/` للمحرك. ويمكن إضافة نطاق مخصص لاحقًا بشكل اختياري من لوحة Render.

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
- لا توجد قاعدة بيانات لحفظ ملفات المستخدمين.

## خط ثمانية

الواجهة تستخدم خط ثمانية المرفوع من صاحب المشروع. ملف الترخيص الأصلي موجود في `licenses/THMANYAH-FONT-LICENSE.pdf`. لا تُعد توزيع ملفات الخط منفصلة عن المنتج ولا تنسب الخط إلى المشروع.
