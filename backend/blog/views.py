from __future__ import annotations

import bleach
import markdown
from django.http import JsonResponse
from django.utils import formats, timezone
from django.views.decorators.http import require_GET

from .models import Article

ALLOWED_TAGS = ["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "blockquote", "a", "code", "pre", "br", "hr"]
ALLOWED_ATTRIBUTES = {"a": ["href", "title", "rel"]}


def _content_html(content: str) -> str:
    rendered = markdown.markdown(content, extensions=["extra", "sane_lists"])
    return bleach.clean(
        rendered,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        protocols=["http", "https", "mailto"],
        strip=True,
    )


def _serialize(article: Article, include_content: bool = False) -> dict:
    payload = {
        "slug": article.slug,
        "title": article.title,
        "excerpt": article.excerpt,
        "category": article.category,
        "author": article.author,
        "date": formats.date_format(article.published_at, "j F Y"),
        "publishedAt": article.published_at.isoformat(),
        "readTime": f"{article.reading_minutes} دقائق",
        "coverImage": article.cover_image_url,
        "coverAlt": article.cover_image_alt or article.title,
        "featured": article.is_featured,
        "metaTitle": article.meta_title or article.title,
        "metaDescription": article.meta_description or article.excerpt,
    }
    if include_content:
        payload["bodyHtml"] = _content_html(article.content)
    return payload


def _published():
    return Article.objects.filter(is_published=True, published_at__lte=timezone.now())


def _cache(response: JsonResponse) -> JsonResponse:
    response["Cache-Control"] = "public, max-age=60, stale-while-revalidate=300"
    return response


@require_GET
def article_list(request):
    try:
        limit = min(max(int(request.GET.get("limit", "24")), 1), 50)
    except ValueError:
        limit = 24
    articles = [_serialize(article) for article in _published()[:limit]]
    return _cache(JsonResponse({"ok": True, "articles": articles}, json_dumps_params={"ensure_ascii": False}))


@require_GET
def article_detail(_request, slug: str):
    article = _published().filter(slug=slug).first()
    if article is None:
        return JsonResponse({"ok": False, "error": "المقال غير موجود."}, status=404, json_dumps_params={"ensure_ascii": False})
    return _cache(JsonResponse({"ok": True, "article": _serialize(article, include_content=True)}, json_dumps_params={"ensure_ascii": False}))
