# محرك سياق — Django

<<<<<<< HEAD
خدمة معالجة ملفات مؤقتة تدعم 99 مسارًا ضمن ست مجموعات، وتضم لوحة إدارة عربية لنشر مقالات المنصة.
=======
واجهة معالجة ملفات مؤقتة تدعم 99 مسارًا ضمن ست مجموعات: PDF، Office، الصور، التحويلات العامة، التعديل والحماية، والاستخراج الذكي.
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40

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
<<<<<<< HEAD
python manage.py migrate
python manage.py seed_articles
python manage.py createsuperuser
python manage.py runserver
```

بعد التشغيل افتح `/admin/` لإدارة المقالات. تعرض الواجهة العامة المقالات المنشورة من `/api/v1/blog/articles/`، وتبقى المقالات غير المنشورة مخفية.

=======
python manage.py runserver
```

>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
للإنتاج استخدم Dockerfile المرفق؛ فهو يثبت LibreOffice وGhostscript وTesseract العربي وQPDF والخطوط المطلوبة.

## الصحة

```text
GET /api/v1/health/
```

تعيد قائمة الأدوات التي حمّلها المحرك فعليًا. لا يحتفظ المحرك بالملفات أو النتائج بعد انتهاء الاستجابة.
