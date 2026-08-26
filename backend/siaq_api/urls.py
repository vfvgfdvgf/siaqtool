from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "إدارة سياق"
admin.site.site_title = "لوحة سياق"
admin.site.index_title = "المحتوى والإعدادات"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/blog/", include("blog.urls")),
    path("api/v1/", include("converter.urls")),
]
