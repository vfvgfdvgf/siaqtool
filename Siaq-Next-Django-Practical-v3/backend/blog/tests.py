from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from .models import Article


class ArticleAdminTests(TestCase):
    def setUp(self):
        self.admin = get_user_model().objects.create_superuser(
            username="admin-test",
            email="admin@example.com",
            password="safe-test-password",
        )
        self.client.force_login(self.admin)

    def test_admin_can_create_article_without_writing_a_slug(self):
        response = self.client.post(
            reverse("admin:blog_article_add"),
            {
                "title": "دليل عملي جديد",
                "slug": "",
                "category": "دليل",
                "excerpt": "وصف واضح ومختصر للمقال الجديد.",
                "content": "مقدمة المقال\n\n## عنوان فرعي\n\nمحتوى المقال.",
                "cover_image_url": "/images/siaq-knowledge-hub.webp",
                "cover_image_alt": "وصف صورة المقال",
                "author": "فريق سياق",
                "reading_minutes": "3",
                "published_at_0": timezone.localdate().isoformat(),
                "published_at_1": "12:00:00",
                "is_published": "on",
                "_save": "حفظ",
            },
        )

        self.assertEqual(response.status_code, 302)
        article = Article.objects.get(title="دليل عملي جديد")
        self.assertEqual(article.slug, "دليل-عملي-جديد")

    def test_duplicate_titles_receive_distinct_slugs(self):
        first = Article.objects.create(
            title="عنوان متكرر",
            excerpt="الوصف الأول",
            content="المحتوى الأول",
        )
        second = Article.objects.create(
            title="عنوان متكرر",
            excerpt="الوصف الثاني",
            content="المحتوى الثاني",
        )

        self.assertEqual(first.slug, "عنوان-متكرر")
        self.assertEqual(second.slug, "عنوان-متكرر-2")
