from __future__ import annotations

from pathlib import Path

from .core import ProcessResult, ProcessingError
from .image_tools import IMAGE_PROCESSORS
from .office_tools import OFFICE_PROCESSORS
from .pdf_tools import PDF_PROCESSORS
from .utility_tools import UTILITY_PROCESSORS
from .data_tools import DATA_PROCESSORS


PROCESSORS = {
    **PDF_PROCESSORS,
    **OFFICE_PROCESSORS,
    **IMAGE_PROCESSORS,
    **UTILITY_PROCESSORS,
    **DATA_PROCESSORS,
}
SUPPORTED_TOOLS = frozenset(PROCESSORS)


def process(tool_slug: str, paths: list[Path], options: dict, workdir: Path) -> ProcessResult:
    processor = PROCESSORS.get(tool_slug)
    if not processor:
        raise ProcessingError("هذه الأداة غير متاحة في المحرك الحالي.")
    try:
        return processor(paths, workdir, options)
    except ProcessingError:
        raise
    except Exception as exc:
        raise ProcessingError("تعذر معالجة الملف. تأكد من أنه سليم وغير مشفّر.") from exc
