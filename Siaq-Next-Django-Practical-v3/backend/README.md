# محرك سياق — Django

خدمة معالجة ملفات مؤقتة تدعم 100 مسار ضمن ست مجموعات، وتضم لوحة إدارة عربية لنشر مقالات المنصة.

## نقطة النهاية

```text
POST /api/v1/tools/<tool-slug>/process/
```

أرسل الملفات في حقول `files`، والإعدادات كـJSON داخل حقل `options`. يعيد المحرك ملف النتيجة مباشرة، أو استجابة JSON عربية عند الخطأ.

```bash
curl -X POST http://localhost:8000/api/v1/tools/excel-to-word/process/ \
  -F "files=@table.xlsx" \
  -F 'options={}' \
  --output result.docx
```

## التشغيل

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_articles
python manage.py createsuperuser
python manage.py runserver
```

بعد التشغيل افتح `/admin/` لإدارة المقالات. اترك حقل الرابط المختصر فارغًا عند إضافة مقال وسيُنشأ تلقائيًا. تعرض الواجهة العامة المقالات المنشورة من `/api/v1/blog/articles/`، وتبقى المقالات غير المنشورة مخفية.

للإنتاج استخدم Dockerfile المرفق؛ فهو يثبت LibreOffice وGhostscript وTesseract العربي وQPDF والخطوط المطلوبة.

## الصحة

```text
GET /api/v1/health/
```

تعيد قائمة الأدوات التي حمّلها المحرك فعليًا. لا يحتفظ المحرك بالملفات أو النتائج بعد انتهاء الاستجابة.
