from django.db import migrations, models
import django.utils.timezone
import blog.models


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=220, verbose_name="العنوان")),
                ("slug", models.SlugField(allow_unicode=True, blank=True, max_length=240, unique=True, verbose_name="الرابط المختصر")),
                ("category", models.CharField(default="دليل", max_length=80, verbose_name="القسم")),
                ("excerpt", models.TextField(max_length=360, verbose_name="الوصف المختصر")),
                ("content", models.TextField(help_text="اكتب المحتوى بصيغة Markdown. استخدم ## للعناوين و - للقوائم و ** للنص العريض.", verbose_name="المحتوى")),
                ("cover_image_url", models.CharField(blank=True, help_text="رابط https أو مسار صورة داخل الموقع مثل /images/example.webp.", max_length=800, validators=[blog.models.validate_image_reference], verbose_name="رابط صورة الغلاف")),
                ("cover_image_alt", models.CharField(blank=True, max_length=220, verbose_name="وصف صورة الغلاف")),
                ("author", models.CharField(default="فريق سياق", max_length=100, verbose_name="الكاتب")),
                ("reading_minutes", models.PositiveSmallIntegerField(default=3, verbose_name="مدة القراءة بالدقائق")),
                ("is_featured", models.BooleanField(default=False, verbose_name="مقال مميز")),
                ("is_published", models.BooleanField(default=True, verbose_name="منشور")),
                ("published_at", models.DateTimeField(default=django.utils.timezone.now, verbose_name="تاريخ النشر")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإنشاء")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="آخر تحديث")),
                ("meta_title", models.CharField(blank=True, max_length=220, verbose_name="عنوان محركات البحث")),
                ("meta_description", models.CharField(blank=True, max_length=360, verbose_name="وصف محركات البحث")),
            ],
            options={"verbose_name": "مقال", "verbose_name_plural": "المقالات", "ordering": ["-is_featured", "-published_at"]},
        ),
        migrations.AddIndex(model_name="article", index=models.Index(fields=["is_published", "-published_at"], name="blog_publish_idx")),
        migrations.AddIndex(model_name="article", index=models.Index(fields=["is_featured", "-published_at"], name="blog_feature_idx")),
    ]
