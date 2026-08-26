from urllib.parse import urlparse

from django.core.exceptions import ValidationError
from django.db import models
from django.template.defaultfilters import slugify
from django.utils import timezone


def validate_image_reference(value: str) -> None:
    if not value:
        return
    parsed = urlparse(value)
    if value.startswith("/") or parsed.scheme in {"http", "https"}:
        return
    raise ValidationError("استخدم رابط صورة كاملاً أو مسارًا يبدأ بعلامة /.")


class Article(models.Model):
    title = models.CharField("العنوان", max_length=220)
    slug = models.SlugField("الرابط المختصر", max_length=240, unique=True, allow_unicode=True, blank=True)
    category = models.CharField("القسم", max_length=80, default="دليل")
    excerpt = models.TextField("الوصف المختصر", max_length=360)
    content = models.TextField(
        "المحتوى",
        help_text="اكتب المحتوى بصيغة Markdown. استخدم ## للعناوين و - للقوائم و ** للنص العريض.",
    )
    cover_image_url = models.CharField(
        "رابط صورة الغلاف",
        max_length=800,
        blank=True,
        validators=[validate_image_reference],
        help_text="رابط https أو مسار صورة داخل الموقع مثل /images/example.webp.",
    )
    cover_image_alt = models.CharField("وصف صورة الغلاف", max_length=220, blank=True)
    author = models.CharField("الكاتب", max_length=100, default="فريق سياق")
    reading_minutes = models.PositiveSmallIntegerField("مدة القراءة بالدقائق", default=3)
    is_featured = models.BooleanField("مقال مميز", default=False)
    is_published = models.BooleanField("منشور", default=True)
    published_at = models.DateTimeField("تاريخ النشر", default=timezone.now)
    created_at = models.DateTimeField("تاريخ الإنشاء", auto_now_add=True)
    updated_at = models.DateTimeField("آخر تحديث", auto_now=True)
    meta_title = models.CharField("عنوان محركات البحث", max_length=220, blank=True)
    meta_description = models.CharField("وصف محركات البحث", max_length=360, blank=True)

    class Meta:
        verbose_name = "مقال"
        verbose_name_plural = "المقالات"
        ordering = ["-is_featured", "-published_at"]
        indexes = [
            models.Index(fields=["is_published", "-published_at"], name="blog_publish_idx"),
            models.Index(fields=["is_featured", "-published_at"], name="blog_feature_idx"),
        ]

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title, allow_unicode=True) or f"article-{timezone.now():%Y%m%d%H%M}"
            candidate = base
            counter = 2
            while Article.objects.exclude(pk=self.pk).filter(slug=candidate).exists():
                candidate = f"{base}-{counter}"
                counter += 1
            self.slug = candidate
        super().save(*args, **kwargs)
