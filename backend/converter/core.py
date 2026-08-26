from __future__ import annotations

import mimetypes
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ProcessResult:
    path: Path
    filename: str
    content_type: str


class ProcessingError(RuntimeError):
    pass


def run(command: list[str], timeout: int = 180) -> None:
    try:
        completed = subprocess.run(command, capture_output=True, text=True, timeout=timeout, check=False)
    except (OSError, subprocess.TimeoutExpired) as exc:
        raise ProcessingError("تعذر تشغيل محرك التحويل المطلوب.") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "").strip()[-500:]
        raise ProcessingError("لم يتمكن المحرك من معالجة هذا الملف." + (f" ({detail})" if detail else ""))


def pdf_result(path: Path, name: str) -> ProcessResult:
    return ProcessResult(path, name, "application/pdf")


def file_result(path: Path, name: str, content_type: str | None = None) -> ProcessResult:
    return ProcessResult(path, name, content_type or mimetypes.guess_type(name)[0] or "application/octet-stream")


def libreoffice() -> str:
    executable = shutil.which("soffice") or shutil.which("libreoffice")
    if not executable:
        raise ProcessingError("محرك Office غير متوفر على الخادم.")
    return executable


def libreoffice_convert(source: Path, workdir: Path, target: str, timeout: int = 240) -> Path:
    before = set(workdir.iterdir())
    run([
        libreoffice(), "--headless", "--nologo", "--nodefault", "--nofirststartwizard",
        "--nolockcheck", "--convert-to", target, "--outdir", str(workdir), str(source),
    ], timeout=timeout)
    target_extension = "." + target.split(":", 1)[0].lower()
    created = [item for item in workdir.iterdir() if item not in before and item.suffix.lower() == target_extension]
    if not created:
        created = [item for item in workdir.glob(f"*{target_extension}") if item != source]
    if not created:
        raise ProcessingError("لم ينتج محرك Office ملف النتيجة.")
    return max(created, key=lambda item: item.stat().st_mtime_ns)
