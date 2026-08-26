from __future__ import annotations

import json
import shutil
import zipfile
from io import BytesIO
from pathlib import Path

import cairosvg
import pillow_heif
from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

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
    "png-to-bmp": ("BMP", ".bmp"),
    "bmp-to-png": ("PNG", ".png"),
    "tiff-to-png": ("PNG", ".png"),
    "gif-to-png": ("PNG", ".png"),
    "avif-to-png": ("PNG", ".png"),
    "ico-to-png": ("PNG", ".png"),
    "heic-to-webp": ("WEBP", ".webp"),
}

TRANSFORM_TOOLS = {
    "compress-image", "resize-image", "crop-image", "rotate-image", "flip-image",
    "grayscale-image", "blur-image", "sharpen-image", "watermark-image",
    "remove-image-metadata", "invert-image", "sepia-image", "auto-contrast-image",
    "equalize-image", "brightness-image", "contrast-image", "posterize-image",
    "image-border", "square-image",
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
        elif slug == "invert-image":
            image = ImageOps.invert(_flatten(image))
        elif slug == "sepia-image":
            image = ImageOps.colorize(ImageOps.grayscale(image), "#2b1b12", "#f3d8ad")
        elif slug == "auto-contrast-image":
            image = ImageOps.autocontrast(_flatten(image), cutoff=1)
        elif slug == "equalize-image":
            image = ImageOps.equalize(_flatten(image))
        elif slug == "brightness-image":
            image = ImageEnhance.Brightness(image).enhance(max(.2, min(float(options.get("strength", 1.15)), 3)))
        elif slug == "contrast-image":
            image = ImageEnhance.Contrast(image).enhance(max(.2, min(float(options.get("strength", 1.2)), 3)))
        elif slug == "posterize-image":
            image = ImageOps.posterize(_flatten(image), max(2, min(int(options.get("bits", 4)), 7)))
        elif slug == "image-border":
            border = max(2, min(int(options.get("border", 24)), 240))
            image = ImageOps.expand(_flatten(image), border=border, fill="white")
        elif slug == "square-image":
            side = max(image.size)
            square = Image.new("RGB", (side, side), "white")
            flattened = _flatten(image)
            square.paste(flattened, ((side - flattened.width) // 2, (side - flattened.height) // 2))
            image.close()
            flattened.close()
            image = square
        if slug in TRANSFORM_TOOLS:
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


def image_palette(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    source = _open(paths[0])
    image = source.convert("RGB")
    source.close()
    image.thumbnail((360, 360), Image.Resampling.LANCZOS)
    quantized = image.quantize(colors=8)
    colors = sorted(quantized.getcolors() or [], reverse=True)
    palette = quantized.getpalette() or []
    total = max(1, sum(count for count, _ in colors))
    payload = []
    for count, index in colors:
        red, green, blue = palette[index * 3:index * 3 + 3]
        payload.append({"hex": f"#{red:02x}{green:02x}{blue:02x}", "share": round(count / total * 100, 2)})
    image.close()
    quantized.close()
    output = workdir / "image-palette.json"
    output.write_text(json.dumps({"colors": payload}, ensure_ascii=False, indent=2), encoding="utf-8")
    return file_result(output, "siaq-image-palette.json", "application/json")


def compare_images(paths: list[Path], workdir: Path, _options: dict) -> ProcessResult:
    if len(paths) < 2:
        raise ProcessingError("المقارنة تحتاج صورتين على الأقل.")
    first = _flatten(_open(paths[0]))
    second_source = _flatten(_open(paths[1]))
    second = ImageOps.fit(second_source, first.size, Image.Resampling.LANCZOS)
    difference = ImageChops.difference(first, second)
    difference = ImageEnhance.Contrast(difference).enhance(2.5)
    output = workdir / "image-difference.png"
    difference.save(output, "PNG", optimize=True)
    first.close(); second_source.close(); second.close(); difference.close()
    return file_result(output, "siaq-image-difference.png", "image/png")


IMAGE_PROCESSORS = {slug: (lambda p, w, o, tool_slug=slug: process_images(p, w, o, tool_slug)) for slug in [
    *TRANSFORM_TOOLS, *TARGET_FORMATS.keys(), "svg-to-png", "svg-to-jpg",
]}
IMAGE_PROCESSORS.update({
    "image-metadata": image_metadata,
    "image-to-text": ocr_image,
    "image-palette": image_palette,
    "compare-images": compare_images,
})
