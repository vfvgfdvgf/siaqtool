# محرك سياق — Django

واجهة معالجة ملفات مؤقتة تدعم 99 مسارًا ضمن ست مجموعات: PDF، Office، الصور، التحويلات العامة، التعديل والحماية، والاستخراج الذكي.

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
python manage.py runserver
```

للإنتاج استخدم Dockerfile المرفق؛ فهو يثبت LibreOffice وGhostscript وTesseract العربي وQPDF والخطوط المطلوبة.

## الصحة

```text
GET /api/v1/health/
```

تعيد قائمة الأدوات التي حمّلها المحرك فعليًا. لا يحتفظ المحرك بالملفات أو النتائج بعد انتهاء الاستجابة.
