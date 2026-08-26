from django.urls import path

from . import views

app_name = "blog"

urlpatterns = [
    path("articles/", views.article_list, name="article-list"),
    path("articles/<str:slug>/", views.article_detail, name="article-detail"),
]
