from django import forms
from django.contrib import admin

from .models import Article


class ArticleAdminForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = "__all__"
        widgets = {
            "excerpt": forms.Textarea(attrs={"rows": 3}),
            "content": forms.Textarea(attrs={"rows": 18}),
            "meta_description": forms.Textarea(attrs={"rows": 3}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["slug"].help_text = "اختياري: اتركه فارغًا وسينشئ سياق رابطًا مناسبًا تلقائيًا."
        self.fields["cover_image_url"].help_text = "ألصق رابط https للصورة أو استخدم مسارًا مثل /images/example.webp."


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    form = ArticleAdminForm
    list_display = ("title", "category", "published_at", "is_featured", "is_published", "updated_at")
    list_display_links = ("title",)
    list_editable = ("is_featured", "is_published")
    list_filter = ("is_published", "is_featured", "category", "published_at")
    search_fields = ("title", "excerpt", "content", "author")
    date_hierarchy = "published_at"
    ordering = ("-is_featured", "-published_at")
    readonly_fields = ("created_at", "updated_at")
    save_on_top = True
    list_per_page = 30
    empty_value_display = "—"
    fieldsets = (
        ("المحتوى", {"fields": ("title", "slug", "category", "excerpt", "content")} ),
        ("الصورة", {"fields": ("cover_image_url", "cover_image_alt")} ),
        ("النشر", {"fields": ("author", "reading_minutes", "published_at", "is_featured", "is_published")} ),
        ("محركات البحث", {"classes": ("collapse",), "fields": ("meta_title", "meta_description")} ),
        ("السجل", {"classes": ("collapse",), "fields": ("created_at", "updated_at")} ),
    )
