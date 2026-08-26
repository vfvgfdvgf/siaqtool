from __future__ import annotations

import difflib
import json
import re
import zipfile
from collections import Counter
from io import BytesIO
from pathlib import Path

import pymupdf as fitz
from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas

from .core import ProcessResult, ProcessingError, file_result, pdf_result, run


def _reader(path: Path) -> PdfReader:
    reader = PdfReader(str(path), strict=False)
    if not reader.pages:
        raise ProcessingError("الملف لا يحتوي على صفحات.")
    return reader


def _write_pages(pages, output: Path) -> None:
    writer = PdfWriter()
    for page in pages:
        writer.add_page(page)
    with output.open("wb") as target:
        writer.write(target)


def _page_numbers(value: object, total: int, default: list[int]) -> list[int]:
    raw = str(value or "").strip()
    if not raw:
        return default
    result: list[int] = []
    for token in re.split(r"[,،\s]+", raw):
        if not token:
            continue
        if "-" in token:
            start_text, end_text = token.split("-", 1)
            start, end = int(start_text), int(end_text)
            result.extend(range(min(start, end), max(start, end) + 1))
        else:
            result.append(int(token))
    normalized = [number - 1 for number in result if 1 <= number <= total]
    if not normalized:
        raise ProcessingError("لم تحدد صفحات صحيحة.")
    return normalized


def merge_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    if len(paths) < 2:
        raise ProcessingError("الدمج يحتاج ملفين على الأقل.")
    writer = PdfWriter()
    for path in paths:
        writer.append(str(path))
    output = workdir / "merged.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-merged.pdf")


def split_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    reader = _reader(paths[0])
    archive = workdir / "split-pages.zip"
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
        for index, page in enumerate(reader.pages, start=1):
            page_path = workdir / f"page-{index}.pdf"
            _write_pages([page], page_path)
            bundle.write(page_path, f"page-{index}.pdf")
    return file_result(archive, "siaq-split-pages.zip", "application/zip")


def compress_pdf(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    profiles = {"screen": "/screen", "balanced": "/ebook", "print": "/printer"}
    profile = profiles.get(str(options.get("quality", "balanced")), "/ebook")
    output = workdir / "compressed.pdf"
    run(["gs", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.6", f"-dPDFSETTINGS={profile}", "-dNOPAUSE", "-dQUIET", "-dBATCH", f"-sOutputFile={output}", str(paths[0])])
    return pdf_result(output, "siaq-compressed.pdf")


def rotate_pdf(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    angle = int(options.get("angle", 90))
    if angle not in {90, 180, 270}:
        raise ProcessingError("زاوية التدوير غير صحيحة.")
    writer = PdfWriter()
    for path in paths:
        for page in _reader(path).pages:
            writer.add_page(page.rotate(angle))
    output = workdir / "rotated.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-rotated.pdf")


def crop_pdf(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    margin = max(0.0, min(float(options.get("margin", 12)), 72.0))
    writer = PdfWriter()
    for page in _reader(paths[0]).pages:
        left, bottom = float(page.mediabox.left) + margin, float(page.mediabox.bottom) + margin
        right, top = float(page.mediabox.right) - margin, float(page.mediabox.top) - margin
        if left >= right or bottom >= top:
            raise ProcessingError("قيمة القص أكبر من مساحة الصفحة.")
        page.cropbox.lower_left = (left, bottom)
        page.cropbox.upper_right = (right, top)
        writer.add_page(page)
    output = workdir / "cropped.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-cropped.pdf")


def repair_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    try:
        reader = _reader(paths[0])
    except Exception as exc:
        raise ProcessingError("تعذر استعادة بنية هذا الملف.") from exc
    output = workdir / "repaired.pdf"
    _write_pages(reader.pages, output)
    return pdf_result(output, "siaq-repaired.pdf")


def convert_pdfa(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    output = workdir / "archive.pdf"
    run(["gs", "-dPDFA=2", "-dBATCH", "-dNOPAUSE", "-sDEVICE=pdfwrite", "-dPDFACompatibilityPolicy=1", f"-sOutputFile={output}", str(paths[0])])
    return pdf_result(output, "siaq-archive-pdfa.pdf")


def page_numbers(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    writer = PdfWriter()
    for index, page in enumerate(_reader(paths[0]).pages, start=1):
        width, height = float(page.mediabox.width), float(page.mediabox.height)
        layer_data = BytesIO()
        layer = canvas.Canvas(layer_data, pagesize=(width, height))
        layer.setFont("Helvetica", 10)
        layer.drawCentredString(width / 2, 18, str(index))
        layer.save()
        layer_data.seek(0)
        page.merge_page(PdfReader(layer_data).pages[0])
        writer.add_page(page)
    output = workdir / "numbered.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-numbered.pdf")


def select_pages(paths: list[Path], workdir: Path, options: dict, mode: str) -> ProcessResult:
    reader = _reader(paths[0])
    total = len(reader.pages)
    requested = _page_numbers(options.get("pages") or options.get("order"), total, [0])
    if mode == "delete":
        selected = [page for index, page in enumerate(reader.pages) if index not in set(requested)]
    elif mode == "extract":
        selected = [reader.pages[index] for index in requested]
    elif mode == "reorder":
        selected = [reader.pages[index] for index in requested]
        selected.extend(page for index, page in enumerate(reader.pages) if index not in set(requested))
    elif mode == "reverse":
        selected = list(reversed(reader.pages))
    else:
        selected = list(reader.pages)
        for index in requested:
            selected.insert(index + 1, reader.pages[index])
    if not selected:
        raise ProcessingError("لا يمكن حذف جميع الصفحات.")
    output = workdir / f"{mode}.pdf"
    _write_pages(selected, output)
    return pdf_result(output, f"siaq-{mode}.pdf")


def organize_pdf(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    return select_pages(paths, workdir, options, "reorder")


def grayscale_or_flatten(paths: list[Path], workdir: Path, _options: dict, grayscale: bool) -> ProcessResult:
    source = fitz.open(paths[0])
    rendered: list[Image.Image] = []
    try:
        for page in source:
            pixmap = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False, colorspace=fitz.csGRAY if grayscale else fitz.csRGB)
            mode = "L" if grayscale else "RGB"
            rendered.append(Image.frombytes(mode, (pixmap.width, pixmap.height), pixmap.samples).convert("RGB"))
        if not rendered:
            raise ProcessingError("الملف لا يحتوي على صفحات.")
        output = workdir / ("grayscale.pdf" if grayscale else "flattened.pdf")
        rendered[0].save(output, "PDF", resolution=150, save_all=True, append_images=rendered[1:])
    finally:
        source.close()
        for image in rendered:
            image.close()
    return pdf_result(output, "siaq-grayscale.pdf" if grayscale else "siaq-flattened.pdf")


def remove_metadata(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    reader = _reader(paths[0])
    writer = PdfWriter()
    writer.append_pages_from_reader(reader)
    writer.add_metadata({})
    output = workdir / "clean.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-clean-metadata.pdf")


def add_blank_page(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    reader = _reader(paths[0])
    writer = PdfWriter()
    writer.append_pages_from_reader(reader)
    last = reader.pages[-1]
    writer.add_blank_page(width=float(last.mediabox.width), height=float(last.mediabox.height))
    output = workdir / "with-blank-page.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-with-blank-page.pdf")


def protect_pdf(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    password = str(options.get("password", ""))
    if len(password) < 6:
        raise ProcessingError("كلمة المرور يجب ألا تقل عن 6 أحرف.")
    writer = PdfWriter()
    writer.append_pages_from_reader(_reader(paths[0]))
    writer.encrypt(password, algorithm="AES-256")
    output = workdir / "protected.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-protected.pdf")


def unlock_pdf(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    reader = PdfReader(str(paths[0]))
    password = str(options.get("password", ""))
    if reader.is_encrypted and not reader.decrypt(password):
        raise ProcessingError("كلمة المرور غير صحيحة.")
    output = workdir / "unlocked.pdf"
    _write_pages(reader.pages, output)
    return pdf_result(output, "siaq-unlocked.pdf")


def watermark(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    text = str(options.get("text", "SIAQ")).strip()[:80]
    if not text:
        raise ProcessingError("اكتب نص العلامة المائية.")
    writer = PdfWriter()
    for page in _reader(paths[0]).pages:
        width, height = float(page.mediabox.width), float(page.mediabox.height)
        layer_data = BytesIO()
        layer = canvas.Canvas(layer_data, pagesize=(width, height))
        layer.saveState()
        layer.setFillAlpha(0.18)
        layer.setFillColorRGB(.89, .15, .18)
        layer.setFont("Helvetica-Bold", min(width, height) / 13)
        layer.translate(width / 2, height / 2)
        layer.rotate(35)
        layer.drawCentredString(0, 0, text)
        layer.restoreState()
        layer.save()
        layer_data.seek(0)
        page.merge_page(PdfReader(layer_data).pages[0])
        writer.add_page(page)
    output = workdir / "watermarked.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-watermarked.pdf")


def annotate_pdf(paths: list[Path], workdir: Path, options: dict, mode: str) -> ProcessResult:
    document = fitz.open(paths[0])
    text = str(options.get("text") or {"sign": "تم التوقيع", "stamp": "معتمد", "header-footer": "سياق", "edit": "نص جديد"}.get(mode, "سياق"))[:100]
    for index, page in enumerate(document):
        if mode == "redact":
            width, height = page.rect.width, page.rect.height
            page.add_redact_annot(fitz.Rect(width * .08, height * .78, width * .92, height * .9), fill=(0, 0, 0))
            page.apply_redactions()
        elif mode == "header-footer":
            page.insert_text((36, 26), text, fontsize=9, color=(.35, .35, .38))
            page.insert_text((36, page.rect.height - 20), f"{index + 1} · {text}", fontsize=9, color=(.35, .35, .38))
        else:
            position = (42, page.rect.height - 48) if mode == "sign" else (42, 48)
            color = (.89, .15, .18) if mode == "stamp" else (.12, .12, .13)
            page.insert_text(position, text, fontsize=14 if mode == "stamp" else 11, color=color)
    output = workdir / f"{mode}.pdf"
    document.save(output, garbage=4, deflate=True)
    document.close()
    return pdf_result(output, f"siaq-{mode}.pdf")


def inspect_forms(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    fields = PdfReader(str(paths[0])).get_fields() or {}
    payload = {name: {"type": value.get("/FT"), "value": value.get("/V")} for name, value in fields.items()}
    output = workdir / "form-fields.json"
    output.write_text(json.dumps({"fields": payload, "count": len(payload)}, ensure_ascii=False, indent=2, default=str), encoding="utf-8")
    return file_result(output, "siaq-form-fields.json", "application/json")


def compare_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    if len(paths) != 2:
        raise ProcessingError("المقارنة تحتاج ملفين بالضبط.")
    def extract(path: Path) -> list[str]:
        document = fitz.open(path)
        lines = "\n".join(page.get_text("text") for page in document).splitlines()
        document.close()
        return lines
    report = difflib.HtmlDiff(tabsize=4, wrapcolumn=90).make_file(extract(paths[0]), extract(paths[1]), "النسخة الأولى", "النسخة الثانية", context=True)
    output = workdir / "comparison.html"
    output.write_text(report, encoding="utf-8")
    return file_result(output, "siaq-comparison.html", "text/html; charset=utf-8")


def summarize_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    document = fitz.open(paths[0])
    text = " ".join(page.get_text("text") for page in document)
    document.close()
    sentences = [item.strip() for item in re.split(r"(?<=[.!؟])\s+|\n+", text) if len(item.strip()) > 35]
    words = re.findall(r"[\w\u0600-\u06ff]{3,}", text.lower())
    stop = {"هذا", "هذه", "التي", "الذي", "على", "إلى", "من", "في", "عن", "with", "from", "that", "this"}
    frequency = Counter(word for word in words if word not in stop)
    ranked = sorted(enumerate(sentences), key=lambda item: sum(frequency[word] for word in re.findall(r"[\w\u0600-\u06ff]{3,}", item[1].lower())), reverse=True)[:8]
    summary = [sentence for _, sentence in sorted(ranked)] or ["لم نتمكن من استخراج نص كافٍ للتلخيص."]
    output = workdir / "summary.txt"
    output.write_text("ملخص سياق\n\n" + "\n\n".join(f"• {sentence}" for sentence in summary), encoding="utf-8")
    return file_result(output, "siaq-summary.txt", "text/plain; charset=utf-8")


def extract_text_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    document = fitz.open(paths[0])
    try:
        pages = [f"الصفحة {index}\n{'-' * 24}\n{page.get_text('text').strip()}" for index, page in enumerate(document, start=1)]
    finally:
        document.close()
    output = workdir / "pdf-text.txt"
    output.write_text("\n\n".join(pages), encoding="utf-8")
    return file_result(output, "siaq-pdf-text.txt", "text/plain; charset=utf-8")


def pdf_info(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    reader = _reader(paths[0])
    metadata = reader.metadata or {}
    payload = {
        "pages": len(reader.pages),
        "encrypted": reader.is_encrypted,
        "page_sizes": [
            {"page": index, "width": round(float(page.mediabox.width), 2), "height": round(float(page.mediabox.height), 2)}
            for index, page in enumerate(reader.pages, start=1)
        ],
        "metadata": {str(key).lstrip("/"): str(value) for key, value in metadata.items() if value is not None},
    }
    output = workdir / "pdf-info.json"
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return file_result(output, "siaq-pdf-info.json", "application/json")


def pdf_to_json(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    document = fitz.open(paths[0])
    try:
        payload = {
            "pages": [
                {"number": index, "text": page.get_text("text").strip(), "width": page.rect.width, "height": page.rect.height}
                for index, page in enumerate(document, start=1)
            ]
        }
    finally:
        document.close()
    output = workdir / "pdf-pages.json"
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return file_result(output, "siaq-pdf-pages.json", "application/json")


def extract_images_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    document = fitz.open(paths[0])
    archive = workdir / "pdf-images.zip"
    extracted = 0
    try:
        with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
            seen: set[int] = set()
            for page_number, page in enumerate(document, start=1):
                for image_number, item in enumerate(page.get_images(full=True), start=1):
                    xref = item[0]
                    if xref in seen:
                        continue
                    seen.add(xref)
                    data = document.extract_image(xref)
                    extension = data.get("ext", "bin")
                    extracted += 1
                    bundle.writestr(f"page-{page_number}-image-{image_number}.{extension}", data["image"])
    finally:
        document.close()
    if not extracted:
        archive.unlink(missing_ok=True)
        raise ProcessingError("لم نجد صورًا مضمنة داخل الملف.")
    return file_result(archive, "siaq-pdf-images.zip", "application/zip")


def select_pattern_pages(paths: list[Path], workdir: Path, _options: dict, mode: str) -> ProcessResult:
    reader = _reader(paths[0])
    if mode == "odd":
        pages = [page for index, page in enumerate(reader.pages) if index % 2 == 0]
    elif mode == "even":
        pages = [page for index, page in enumerate(reader.pages) if index % 2 == 1]
    elif mode == "first":
        pages = [reader.pages[0]]
    else:
        pages = [reader.pages[-1]]
    if not pages:
        raise ProcessingError("لا توجد صفحات تطابق هذا الاختيار.")
    output = workdir / f"{mode}-pages.pdf"
    _write_pages(pages, output)
    return pdf_result(output, f"siaq-{mode}-pages.pdf")


def interleave_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    if len(paths) < 2:
        raise ProcessingError("التداخل يحتاج ملفين على الأقل.")
    readers = [_reader(path) for path in paths]
    writer = PdfWriter()
    for page_index in range(max(len(reader.pages) for reader in readers)):
        for reader in readers:
            if page_index < len(reader.pages):
                writer.add_page(reader.pages[page_index])
    output = workdir / "interleaved.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-interleaved.pdf")


def remove_blank_pages(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    document = fitz.open(paths[0])
    reader = _reader(paths[0])
    try:
        keep = [
            index for index, page in enumerate(document)
            if page.get_text("text").strip() or page.get_images(full=True) or page.get_drawings()
        ]
    finally:
        document.close()
    if not keep:
        raise ProcessingError("كل صفحات الملف تبدو فارغة.")
    output = workdir / "without-blank-pages.pdf"
    _write_pages([reader.pages[index] for index in keep], output)
    return pdf_result(output, "siaq-without-blank-pages.pdf")


def add_page_border(paths: list[Path], workdir: Path, options: dict) -> ProcessResult:
    writer = PdfWriter()
    inset = max(6.0, min(float(options.get("margin", 18)), 72.0))
    for page in _reader(paths[0]).pages:
        width, height = float(page.mediabox.width), float(page.mediabox.height)
        layer_data = BytesIO()
        layer = canvas.Canvas(layer_data, pagesize=(width, height))
        layer.setStrokeColorRGB(.15, .15, .17)
        layer.setLineWidth(1)
        layer.rect(inset, inset, width - inset * 2, height - inset * 2)
        layer.save()
        layer_data.seek(0)
        page.merge_page(PdfReader(layer_data).pages[0])
        writer.add_page(page)
    output = workdir / "bordered.pdf"
    with output.open("wb") as target:
        writer.write(target)
    return pdf_result(output, "siaq-bordered.pdf")


def resize_pdf_a4(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    source = fitz.open(paths[0])
    target = fitz.open()
    try:
        for index, page in enumerate(source):
            landscape = page.rect.width > page.rect.height
            width, height = (842, 595) if landscape else (595, 842)
            new_page = target.new_page(width=width, height=height)
            available = fitz.Rect(24, 24, width - 24, height - 24)
            new_page.show_pdf_page(available, source, index, keep_proportion=True)
        output = workdir / "a4.pdf"
        target.save(output, garbage=3, deflate=True)
    finally:
        target.close()
        source.close()
    return pdf_result(output, "siaq-a4.pdf")


def two_up_pdf(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    source = fitz.open(paths[0])
    target = fitz.open()
    try:
        for start in range(0, source.page_count, 2):
            page = target.new_page(width=842, height=595)
            page.show_pdf_page(fitz.Rect(20, 20, 411, 575), source, start, keep_proportion=True)
            if start + 1 < source.page_count:
                page.show_pdf_page(fitz.Rect(431, 20, 822, 575), source, start + 1, keep_proportion=True)
        output = workdir / "two-up.pdf"
        target.save(output, garbage=3, deflate=True)
    finally:
        target.close()
        source.close()
    return pdf_result(output, "siaq-two-pages-per-sheet.pdf")


PDF_PROCESSORS = {
    "merge-pdf": merge_pdf,
    "split-pdf": split_pdf,
    "compress-pdf": compress_pdf,
    "organize-pdf": organize_pdf,
    "rotate-pdf": rotate_pdf,
    "crop-pdf": crop_pdf,
    "repair-pdf": repair_pdf,
    "pdfa": convert_pdfa,
    "page-numbers": page_numbers,
    "delete-pdf-pages": lambda p, w, o: select_pages(p, w, o, "delete"),
    "extract-pdf-pages": lambda p, w, o: select_pages(p, w, o, "extract"),
    "reorder-pdf-pages": lambda p, w, o: select_pages(p, w, o, "reorder"),
    "reverse-pdf-pages": lambda p, w, o: select_pages(p, w, o, "reverse"),
    "duplicate-pdf-pages": lambda p, w, o: select_pages(p, w, o, "duplicate"),
    "grayscale-pdf": lambda p, w, o: grayscale_or_flatten(p, w, o, True),
    "flatten-pdf": lambda p, w, o: grayscale_or_flatten(p, w, o, False),
    "remove-pdf-metadata": remove_metadata,
    "add-blank-pdf-page": add_blank_page,
    "watermark": watermark,
    "protect-pdf": protect_pdf,
    "unlock-pdf": unlock_pdf,
    "edit-pdf": lambda p, w, o: annotate_pdf(p, w, o, "edit"),
    "sign-pdf": lambda p, w, o: annotate_pdf(p, w, o, "sign"),
    "redact-pdf": lambda p, w, o: annotate_pdf(p, w, o, "redact"),
    "pdf-forms": inspect_forms,
    "add-header-footer": lambda p, w, o: annotate_pdf(p, w, o, "header-footer"),
    "stamp-pdf": lambda p, w, o: annotate_pdf(p, w, o, "stamp"),
    "compare-pdf": compare_pdf,
    "summarize-pdf": summarize_pdf,
    "extract-text-pdf": extract_text_pdf,
    "pdf-info": pdf_info,
    "pdf-to-json": pdf_to_json,
    "extract-images-pdf": extract_images_pdf,
    "odd-pages-pdf": lambda p, w, o: select_pattern_pages(p, w, o, "odd"),
    "even-pages-pdf": lambda p, w, o: select_pattern_pages(p, w, o, "even"),
    "first-page-pdf": lambda p, w, o: select_pattern_pages(p, w, o, "first"),
    "last-page-pdf": lambda p, w, o: select_pattern_pages(p, w, o, "last"),
    "interleave-pdf": interleave_pdf,
    "remove-blank-pages": remove_blank_pages,
    "add-page-border": add_page_border,
    "resize-pdf-a4": resize_pdf_a4,
    "two-up-pdf": two_up_pdf,
}
