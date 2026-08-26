<<<<<<< HEAD
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
=======
from django.urls import include, path

urlpatterns = [path("api/v1/", include("converter.urls"))]

>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
