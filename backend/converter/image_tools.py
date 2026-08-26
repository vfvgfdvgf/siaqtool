from __future__ import annotations

import json
import shutil
import zipfile
from io import BytesIO
from pathlib import Path

import cairosvg
import pillow_heif
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

from .core import ProcessResult, ProcessingError, file_result, run

pillow_heif.register_heif_opener()
if hasattr(pillow_heif, "register_avif_opener"):
    pillow_heif.register_avif_opener()

TARGET_FORMATS = {
    "svg-to-png": ("PNG", ".png"),
    "svg-to-jpg": ("JPEG", ".jpg"),
    "jpg-to-png": ("PNG", ".png"),
    "png-to-jpg": ("JPEG", ".jpg"),
    "webp-to-jpg": ("JPEG", ".jpg"),
    "jpg-to-webp": ("WEBP", ".webp"),
    "png-to-webp": ("WEBP", ".webp"),
    "webp-to-png": ("PNG", ".png"),
    "heic-to-jpg": ("JPEG", ".jpg"),
    "heic-to-png": ("PNG", ".png"),
    "bmp-to-jpg": ("JPEG", ".jpg"),
    "tiff-to-jpg": ("JPEG", ".jpg"),
    "gif-to-jpg": ("JPEG", ".jpg"),
    "avif-to-jpg": ("JPEG", ".jpg"),
    "png-to-ico": ("ICO", ".ico"),
    "jpg-to-ico": ("ICO", ".ico"),
}


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/noto/NotoSansArabic-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def _open(path: Path) -> Image.Image:
    try:
        if path.suffix.lower() == ".svg":
            data = cairosvg.svg2png(bytestring=path.read_bytes(), output_width=1800)
            with Image.open(BytesIO(data)) as image:
                return image.convert("RGBA").copy()
        with Image.open(path) as image:
            image.seek(0)
            return ImageOps.exif_transpose(image).copy()
    except Exception as exc:
        raise ProcessingError("تعذر قراءة إحدى الصور.") from exc


def _flatten(image: Image.Image) -> Image.Image:
    if image.mode in {"RGBA", "LA", "P"}:
        background = Image.new("RGB", image.size, "white")
        alpha = image.convert("RGBA")
        background.paste(alpha, mask=alpha.getchannel("A"))
        return background
    return image.convert("RGB")


def _save(image: Image.Image, output: Path, format_name: str, quality: int = 86) -> None:
    if format_name in {"JPEG", "ICO"}:
        image = _flatten(image)
    elif format_name in {"PNG", "WEBP"} and image.mode not in {"RGB", "RGBA", "L", "LA"}:
        image = image.convert("RGBA")
    kwargs: dict = {}
    if format_name in {"JPEG", "WEBP", "AVIF"}:
        kwargs.update(quality=max(35, min(quality, 95)), optimize=True)
    if format_name == "PNG":
        kwargs.update(optimize=True, compress_level=8)
    if format_name == "ICO":
        kwargs.update(sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    image.save(output, format_name, **kwargs)


def _bundle(outputs: list[Path], workdir: Path, stem: str) -> ProcessResult:
    if len(outputs) == 1:
        output = outputs[0]
        return file_result(output, f"siaq-{stem}{output.suffix.lower()}")
    archive = workdir / f"{stem}.zip"
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
        for index, output in enumerate(outputs, start=1):
            bundle.write(output, f"{stem}-{index}{output.suffix.lower()}")
    return file_result(archive, f"siaq-{stem}.zip", "application/zip")


def process_images(paths: list[Path], workdir: Path, options: dict, slug: str) -> ProcessResult:
    outputs: list[Path] = []
    quality = int(options.get("quality", 82) if str(options.get("quality", "")).isdigit() else 82)
    for index, path in enumerate(paths, start=1):
        image = _open(path)
        format_name, extension = TARGET_FORMATS.get(slug, ("JPEG", ".jpg"))
        if slug == "compress-image":
            format_name = "PNG" if path.suffix.lower() == ".png" else "WEBP" if path.suffix.lower() == ".webp" else "JPEG"
            extension = ".png" if format_name == "PNG" else ".webp" if format_name == "WEBP" else ".jpg"
        elif slug == "resize-image":
            maximum = max(320, min(int(options.get("size", 1600)), 6000))
            image.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
        elif slug == "crop-image":
            percentage = max(0, min(float(options.get("crop", 5)), 40)) / 100
            left, top = int(image.width * percentage), int(image.height * percentage)
            image = image.crop((left, top, image.width - left, image.height - top))
        elif slug == "rotate-image":
            angle = int(options.get("angle", 90))
            if angle not in {90, 180, 270}:
                raise ProcessingError("زاوية التدوير غير صحيحة.")
            image = image.rotate(-angle, expand=True)
        elif slug == "flip-image":
            image = ImageOps.mirror(image)
        elif slug == "grayscale-image":
            image = ImageOps.grayscale(image)
        elif slug == "blur-image":
            image = image.filter(ImageFilter.GaussianBlur(radius=max(1, min(float(options.get("radius", 3)), 20))))
        elif slug == "sharpen-image":
            image = ImageEnhance.Sharpness(image).enhance(max(1.1, min(float(options.get("strength", 1.8)), 4)))
        elif slug == "watermark-image":
            image = image.convert("RGBA")
            overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
            draw = ImageDraw.Draw(overlay)
            text = str(options.get("text", "SIAQ"))[:80]
            font = _font(max(18, int(min(image.size) * .055)))
            box = draw.textbbox((0, 0), text, font=font)
            position = (max(18, image.width - (box[2] - box[0]) - 28), max(18, image.height - (box[3] - box[1]) - 28))
            draw.rounded_rectangle((position[0] - 12, position[1] - 8, image.width - 16, image.height - 15), radius=10, fill=(0, 0, 0, 105))
            draw.text(position, text, font=font, fill=(255, 255, 255, 200))
            image = Image.alpha_composite(image, overlay)
        elif slug == "remove-image-metadata":
            image = image.copy()
        if slug in {"compress-image", "resize-image", "crop-image", "rotate-image", "flip-image", "grayscale-image", "blur-image", "sharpen-image", "watermark-image", "remove-image-metadata"}:
            format_name = "PNG" if image.mode in {"RGBA", "LA"} else "JPEG"
            extension = ".png" if format_name == "PNG" else ".jpg"
        output = workdir / f"image-{index}{extension}"
        _save(image, output, format_name, quality=quality)
        image.close()
        outputs.append(output)
    return _bundle(outputs, workdir, slug)


def image_metadata(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    image = _open(paths[0])
    exif = image.getexif()
    payload = {
        "width": image.width,
        "height": image.height,
        "mode": image.mode,
        "format": image.format or paths[0].suffix.lstrip(".").upper(),
        "metadata": {str(key): str(value) for key, value in exif.items()},
    }
    image.close()
    output = workdir / "image-metadata.json"
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return file_result(output, "siaq-image-metadata.json", "application/json")


def ocr_image(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    output_base = workdir / "ocr-result"
    run(["tesseract", str(paths[0]), str(output_base), "-l", "ara+eng", "--psm", "6"], timeout=180)
    output = output_base.with_suffix(".txt")
    if not output.exists():
        raise ProcessingError("لم ينتج محرك OCR نصًا.")
    return file_result(output, "siaq-image-text.txt", "text/plain; charset=utf-8")


IMAGE_PROCESSORS = {slug: (lambda p, w, o, tool_slug=slug: process_images(p, w, o, tool_slug)) for slug in [
    "compress-image", "resize-image", "crop-image", "rotate-image", "flip-image",
    "grayscale-image", "blur-image", "sharpen-image", "watermark-image",
    "remove-image-metadata", *TARGET_FORMATS.keys(), "svg-to-png", "svg-to-jpg",
]}
IMAGE_PROCESSORS.update({"image-metadata": image_metadata, "image-to-text": ocr_image})
