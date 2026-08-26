from __future__ import annotations

import uuid
from pathlib import Path
from typing import Iterable

MAX_FILE_BYTES = 30 * 1024 * 1024
MAX_TOTAL_BYTES = 60 * 1024 * 1024
MAX_FILES = 12

ALLOWED_EXTENSIONS: dict[str, set[str]] = {}


def _allow(slugs: str, extensions: str) -> None:
    accepted = {f".{item}" for item in extensions.split()}
    for slug in slugs.split():
        ALLOWED_EXTENSIONS[slug] = accepted


_allow(
    "merge-pdf split-pdf compress-pdf organize-pdf rotate-pdf crop-pdf repair-pdf pdfa page-numbers "
    "delete-pdf-pages extract-pdf-pages reorder-pdf-pages reverse-pdf-pages duplicate-pdf-pages grayscale-pdf "
    "flatten-pdf remove-pdf-metadata add-blank-pdf-page pdf-to-word pdf-to-excel pdf-to-powerpoint pdf-to-jpg "
    "pdf-to-png pdf-to-markdown edit-pdf sign-pdf watermark unlock-pdf protect-pdf redact-pdf pdf-forms "
    "add-header-footer stamp-pdf compare-pdf ocr-pdf extract-tables-pdf summarize-pdf",
    "pdf",
)
_allow("word-to-pdf word-to-excel word-to-powerpoint word-to-text", "doc docx")
_allow("excel-to-pdf excel-to-word excel-to-powerpoint excel-to-csv", "xls xlsx")
_allow("powerpoint-to-pdf powerpoint-to-word powerpoint-to-excel", "ppt pptx")
_allow("doc-to-docx", "doc")
_allow("docx-to-doc docx-to-odt docx-to-rtf", "docx")
_allow("xls-to-xlsx", "xls")
_allow("xlsx-to-xls xlsx-to-ods", "xlsx")
_allow("ppt-to-pptx", "ppt")
_allow("pptx-to-ppt pptx-to-odp", "pptx")
_allow("odt-to-docx", "odt")
_allow("ods-to-xlsx", "ods")
_allow("odp-to-pptx", "odp")
_allow("rtf-to-docx", "rtf")
_allow("csv-to-excel", "csv")
_allow("text-to-word", "txt")
_allow("excel-to-word", "xls xlsx csv")

_allow("compress-image resize-image crop-image rotate-image flip-image grayscale-image blur-image sharpen-image watermark-image remove-image-metadata", "jpg jpeg png webp")
_allow("image-metadata image-to-text", "jpg jpeg png webp heic heif")
_allow("jpg-to-png", "jpg jpeg")
_allow("png-to-jpg png-to-webp png-to-ico", "png")
_allow("webp-to-jpg webp-to-png", "webp")
_allow("jpg-to-webp jpg-to-ico", "jpg jpeg")
_allow("heic-to-jpg heic-to-png", "heic heif")
_allow("svg-to-png svg-to-jpg", "svg")
_allow("bmp-to-jpg", "bmp")
_allow("tiff-to-jpg", "tif tiff")
_allow("gif-to-jpg", "gif")
_allow("avif-to-jpg", "avif")
_allow("jpg-to-pdf scan-to-pdf", "jpg jpeg png webp heic heif")
_allow("html-to-pdf", "html htm")
_allow("markdown-to-pdf", "md markdown txt")
_allow("zip-files file-hash", "pdf doc docx xls xlsx ppt pptx jpg jpeg png zip txt csv")
_allow("unzip-files", "zip")


class UploadRejected(ValueError):
    pass


def _signature_matches(path: Path, extension: str) -> bool:
    head = path.read_bytes()[:4096]
    if extension == ".pdf":
        return head.startswith(b"%PDF-")
    if extension in {".jpg", ".jpeg"}:
        return head.startswith(b"\xff\xd8\xff")
    if extension == ".png":
        return head.startswith(b"\x89PNG\r\n\x1a\n")
    if extension == ".webp":
        return head.startswith(b"RIFF") and head[8:12] == b"WEBP"
    if extension in {".docx", ".xlsx", ".pptx", ".odt", ".ods", ".odp", ".zip"}:
        return head.startswith(b"PK\x03\x04") or head.startswith(b"PK\x05\x06")
    if extension in {".doc", ".xls", ".ppt"}:
        return head.startswith(b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1")
    if extension == ".rtf":
        return head.lstrip().startswith(b"{\\rtf")
    if extension == ".bmp":
        return head.startswith(b"BM")
    if extension == ".gif":
        return head.startswith((b"GIF87a", b"GIF89a"))
    if extension in {".tif", ".tiff"}:
        return head.startswith((b"II*\x00", b"MM\x00*"))
    if extension == ".ico":
        return head.startswith(b"\x00\x00\x01\x00")
    if extension in {".heic", ".heif", ".avif"}:
        return len(head) > 12 and head[4:8] == b"ftyp"
    if extension in {".txt", ".csv", ".md", ".markdown", ".html", ".htm", ".svg"}:
        if b"\x00" in head:
            return False
        try:
            head.decode("utf-8")
            return True
        except UnicodeDecodeError:
            return extension in {".txt", ".csv", ".html", ".htm"}
    return False


def save_and_validate_uploads(tool_slug: str, uploads: Iterable, workdir: Path) -> list[Path]:
    uploads = list(uploads)
    allowed = ALLOWED_EXTENSIONS.get(tool_slug)
    if not allowed:
        raise UploadRejected("هذه الأداة غير مفعّلة على المحرك بعد.")
    if not uploads:
        raise UploadRejected("اختر ملفًا واحدًا على الأقل.")
    if len(uploads) > MAX_FILES:
        raise UploadRejected(f"الحد الأقصى {MAX_FILES} ملفًا.")
    if sum(getattr(item, "size", 0) for item in uploads) > MAX_TOTAL_BYTES:
        raise UploadRejected("الحجم الإجمالي للملفات أكبر من الحد المسموح.")

    saved: list[Path] = []
    for upload in uploads:
        if upload.size <= 0 or upload.size > MAX_FILE_BYTES:
            raise UploadRejected("حجم أحد الملفات غير مسموح.")
        extension = Path(upload.name).suffix.lower()
        if extension not in allowed:
            raise UploadRejected("صيغة أحد الملفات غير مدعومة لهذه الأداة.")
        destination = workdir / f"{uuid.uuid4().hex}{extension}"
        with destination.open("wb") as target:
            for chunk in upload.chunks():
                target.write(chunk)
        if not _signature_matches(destination, extension):
            destination.unlink(missing_ok=True)
            raise UploadRejected("محتوى الملف لا يطابق صيغته.")
        saved.append(destination)
    return saved
