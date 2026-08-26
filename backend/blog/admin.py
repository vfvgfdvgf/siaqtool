from django.contrib import admin

from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "published_at", "is_featured", "is_published", "updated_at")
    list_display_links = ("title",)
    list_editable = ("is_featured", "is_published")
    list_filter = ("is_published", "is_featured", "category", "published_at")
    search_fields = ("title", "excerpt", "content", "author")
    date_hierarchy = "published_at"
    ordering = ("-is_featured", "-published_at")
    readonly_fields = ("created_at", "updated_at")
    save_on_top = True
    fieldsets = (
        ("المحتوى", {"fields": ("title", "slug", "category", "excerpt", "content")} ),
        ("الصورة", {"fields": ("cover_image_url", "cover_image_alt")} ),
        ("النشر", {"fields": ("author", "reading_minutes", "published_at", "is_featured", "is_published")} ),
        ("محركات البحث", {"classes": ("collapse",), "fields": ("meta_title", "meta_description")} ),
        ("السجل", {"classes": ("collapse",), "fields": ("created_at", "updated_at")} ),
    )
