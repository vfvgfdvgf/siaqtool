from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path, PurePosixPath

import markdown
import pymupdf as fitz
from PIL import Image, ImageOps

from .core import ProcessResult, ProcessingError, file_result, libreoffice_convert, pdf_result, run
from .office_tools import pdf_to_excel


def images_to_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    images: list[Image.Image] = []
    try:
        for path in paths:
            with Image.open(path) as source:
                images.append(ImageOps.exif_transpose(source).convert("RGB").copy())
        if not images:
            raise ProcessingError("لم نجد صورًا قابلة للتحويل.")
        output = workdir / "images.pdf"
        images[0].save(output, "PDF", resolution=150, save_all=True, append_images=images[1:])
    finally:
        for image in images:
            image.close()
    return pdf_result(output, "siaq-images.pdf")


def pdf_to_images(paths: list[Path], workdir: Path, _options: dict, format_name: str) -> ProcessResult:
    document = fitz.open(paths[0])
    if document.page_count == 0:
        raise ProcessingError("الملف لا يحتوي على صفحات.")
    extension = "jpg" if format_name == "jpg" else "png"
    archive = workdir / f"pdf-{extension}.zip"
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
        for index, page in enumerate(document, start=1):
            alpha = format_name == "png"
            pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=alpha)
            image_path = workdir / f"page-{index}.{extension}"
            pixmap.save(image_path)
            bundle.write(image_path, image_path.name)
    document.close()
    return file_result(archive, f"siaq-pdf-to-{extension}.zip", "application/zip")


def html_to_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    output = libreoffice_convert(paths[0], workdir, "pdf")
    return pdf_result(output, "siaq-html-to-pdf.pdf")


def markdown_to_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    text = paths[0].read_text(encoding="utf-8", errors="replace")
    html = markdown.markdown(text, extensions=["tables", "fenced_code"])
    source = workdir / "document.html"
    source.write_text(f"<!doctype html><html dir='rtl' lang='ar'><meta charset='utf-8'><style>body{{font-family:sans-serif;line-height:1.8;max-width:760px;margin:40px auto}}table{{border-collapse:collapse}}td,th{{border:1px solid #ccc;padding:6px}}</style><body>{html}</body></html>", encoding="utf-8")
    output = libreoffice_convert(source, workdir, "pdf")
    return pdf_result(output, "siaq-markdown-to-pdf.pdf")


def pdf_to_markdown(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    document = fitz.open(paths[0])
    parts: list[str] = []
    for index, page in enumerate(document, start=1):
        parts.append(f"## الصفحة {index}\n\n{page.get_text('text').strip()}")
    document.close()
    output = workdir / "document.md"
    output.write_text("\n\n".join(parts), encoding="utf-8")
    return file_result(output, "siaq-document.md", "text/markdown; charset=utf-8")


def zip_files(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    if len(paths) < 2:
        raise ProcessingError("إنشاء ZIP يحتاج ملفين على الأقل.")
    output = workdir / "files.zip"
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as bundle:
        for index, path in enumerate(paths, start=1):
            bundle.write(path, f"file-{index}{path.suffix.lower()}")
    return file_result(output, "siaq-files.zip", "application/zip")


def unzip_files(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    output = workdir / "safe-extracted.zip"
    try:
        with zipfile.ZipFile(paths[0]) as source:
            members = source.infolist()
            if len(members) > 200 or sum(member.file_size for member in members) > 100 * 1024 * 1024:
                raise ProcessingError("محتوى ZIP أكبر من الحد الآمن.")
            with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as target:
                for index, member in enumerate(members, start=1):
                    name = PurePosixPath(member.filename)
                    if member.is_dir() or name.is_absolute() or ".." in name.parts:
                        continue
                    data = source.read(member)
                    safe_name = f"{index:03d}-{name.name}"
                    target.writestr(safe_name, data)
    except zipfile.BadZipFile as exc:
        raise ProcessingError("ملف ZIP غير صالح.") from exc
    return file_result(output, "siaq-extracted.zip", "application/zip")


def file_hash(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    results = []
    for index, path in enumerate(paths, start=1):
        digest = hashlib.sha256()
        with path.open("rb") as source:
            for chunk in iter(lambda: source.read(1024 * 1024), b""):
                digest.update(chunk)
        results.append({"file": index, "extension": path.suffix.lower(), "sha256": digest.hexdigest()})
    output = workdir / "hashes.json"
    output.write_text(json.dumps({"algorithm": "SHA-256", "files": results}, ensure_ascii=False, indent=2), encoding="utf-8")
    return file_result(output, "siaq-file-hashes.json", "application/json")


def ocr_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    output = workdir / "searchable.pdf"
    run(["ocrmypdf", "--skip-text", "--deskew", "--optimize", "1", "-l", "ara+eng", str(paths[0]), str(output)], timeout=420)
    return pdf_result(output, "siaq-searchable.pdf")


UTILITY_PROCESSORS = {
    "jpg-to-pdf": images_to_pdf,
    "scan-to-pdf": images_to_pdf,
    "pdf-to-jpg": lambda p, w, o: pdf_to_images(p, w, o, "jpg"),
    "pdf-to-png": lambda p, w, o: pdf_to_images(p, w, o, "png"),
    "html-to-pdf": html_to_pdf,
    "markdown-to-pdf": markdown_to_pdf,
    "pdf-to-markdown": pdf_to_markdown,
    "zip-files": zip_files,
    "unzip-files": unzip_files,
    "file-hash": file_hash,
    "ocr-pdf": ocr_pdf,
    "extract-tables-pdf": pdf_to_excel,
}
