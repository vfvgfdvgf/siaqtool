import type { LucideIcon } from "lucide-react";
import {
  Archive, ArrowLeftRight, BookOpenCheck, Braces, Crop, FileArchive, FileImage,
  FileLock2, FileOutput, Files, FileScan, FileSignature, FileSpreadsheet,
  FileText, FormInput, Image as ImageIcon, ImageDown, ImagePlus, Languages,
  ListFilter, Minimize2, Presentation, Redo2, RotateCw, ScanText, Scissors,
  ShieldCheck, Sparkles, Stamp, Table2, TextCursorInput, Unlock, WandSparkles,
} from "lucide-react";

const glyphs: Record<string, LucideIcon> = {
  "merge-pdf": Files, "split-pdf": Scissors, "compress-pdf": Minimize2,
  "organize-pdf": ListFilter, "rotate-pdf": RotateCw, "crop-pdf": Crop,
  "repair-pdf": Redo2, pdfa: Archive, "page-numbers": TextCursorInput,
  "delete-pdf-pages": Scissors, "extract-pdf-pages": FileOutput,
  "reorder-pdf-pages": ListFilter, "reverse-pdf-pages": ArrowLeftRight,
  "duplicate-pdf-pages": Files, "grayscale-pdf": FileImage, "flatten-pdf": Archive,
  "remove-pdf-metadata": ShieldCheck, "add-blank-pdf-page": FileOutput,

  "pdf-to-word": FileText, "word-to-pdf": FileOutput, "pdf-to-excel": Table2,
  "excel-to-pdf": FileSpreadsheet, "pdf-to-powerpoint": Presentation,
  "powerpoint-to-pdf": FileOutput, "excel-to-word": FileText,
  "word-to-excel": FileSpreadsheet, "word-to-powerpoint": Presentation,
  "powerpoint-to-word": FileText, "excel-to-powerpoint": Presentation,
  "powerpoint-to-excel": FileSpreadsheet, "doc-to-docx": FileText,
  "docx-to-doc": FileText, "xls-to-xlsx": FileSpreadsheet, "xlsx-to-xls": FileSpreadsheet,
  "ppt-to-pptx": Presentation, "pptx-to-ppt": Presentation, "odt-to-docx": FileText,
  "docx-to-odt": FileText, "ods-to-xlsx": FileSpreadsheet, "xlsx-to-ods": FileSpreadsheet,
  "odp-to-pptx": Presentation, "pptx-to-odp": Presentation, "rtf-to-docx": FileText,
  "docx-to-rtf": FileText, "csv-to-excel": Table2, "excel-to-csv": FileSpreadsheet,
  "text-to-word": FileText, "word-to-text": TextCursorInput,

  "compress-image": ImageDown, "resize-image": ImageIcon, "crop-image": Crop,
  "rotate-image": RotateCw, "flip-image": ArrowLeftRight, "grayscale-image": FileImage,
  "blur-image": ImageIcon, "sharpen-image": WandSparkles, "watermark-image": Stamp,
  "remove-image-metadata": ShieldCheck, "image-metadata": FileImage,
  "jpg-to-png": ImageIcon, "png-to-jpg": FileImage, "webp-to-jpg": FileImage,
  "jpg-to-webp": ImageIcon, "png-to-webp": ImageIcon, "webp-to-png": ImageIcon,
  "heic-to-jpg": FileImage, "heic-to-png": ImageIcon, "svg-to-png": Braces,
  "svg-to-jpg": Braces, "bmp-to-jpg": FileImage, "tiff-to-jpg": FileScan,
  "gif-to-jpg": FileImage, "avif-to-jpg": FileImage, "png-to-ico": ImagePlus,
  "jpg-to-ico": ImagePlus,

  "jpg-to-pdf": ImagePlus, "pdf-to-jpg": FileImage, "pdf-to-png": FileImage,
  "scan-to-pdf": FileScan, "html-to-pdf": Braces, "markdown-to-pdf": BookOpenCheck,
  "pdf-to-markdown": BookOpenCheck, "zip-files": FileArchive, "unzip-files": Archive,
  "file-hash": ShieldCheck,

  "edit-pdf": WandSparkles, "sign-pdf": FileSignature, watermark: Stamp,
  "unlock-pdf": Unlock, "protect-pdf": FileLock2, "redact-pdf": ShieldCheck,
  "pdf-forms": FormInput, "add-header-footer": TextCursorInput, "stamp-pdf": Stamp,
  "compare-pdf": ArrowLeftRight,

  "ocr-pdf": ScanText, "image-to-text": ScanText, "extract-tables-pdf": Table2,
  "summarize-pdf": Sparkles, "translate-pdf": Languages,
};

const operationMarks: Record<string, string> = {
  "merge-pdf": "PDF+", "split-pdf": "PDF÷", "compress-pdf": "PDF↓",
  "organize-pdf": "1·2·3", "rotate-pdf": "90°", "crop-pdf": "قص",
  "repair-pdf": "إصلاح", pdfa: "PDF/A", "page-numbers": "1—9",
  "delete-pdf-pages": "−صفحة", "extract-pdf-pages": "+صفحة",
  "reorder-pdf-pages": "ترتيب", "reverse-pdf-pages": "عكس",
  "duplicate-pdf-pages": "×2", "grayscale-pdf": "B/W", "flatten-pdf": "طبقة",
  "remove-pdf-metadata": "EXIF−", "add-blank-pdf-page": "+PDF",
  "compress-image": "IMG↓", "resize-image": "PX", "crop-image": "قص",
  "rotate-image": "90°", "flip-image": "↔", "grayscale-image": "B/W",
  "blur-image": "تمويه", "sharpen-image": "HD", "watermark-image": "©",
  "remove-image-metadata": "EXIF−", "image-metadata": "EXIF",
  "zip-files": "ZIP+", "unzip-files": "ZIP−", "file-hash": "SHA",
  "edit-pdf": "تحرير", "sign-pdf": "توقيع", watermark: "©",
  "unlock-pdf": "فتح", "protect-pdf": "AES", "redact-pdf": "حجب",
  "pdf-forms": "FORM", "add-header-footer": "H/F", "stamp-pdf": "ختم",
  "compare-pdf": "A/B", "ocr-pdf": "OCR", "image-to-text": "OCR",
  "extract-tables-pdf": "XLSX", "summarize-pdf": "AI", "translate-pdf": "AR/EN",
};

function formatMark(slug: string) {
  if (operationMarks[slug]) return operationMarks[slug];
  const target = slug.split("-to-")[1];
  return (target || slug).replace("powerpoint", "PPT").replace("markdown", "MD").toUpperCase().slice(0, 5);
}

function variant(slug: string) {
  return [...slug].reduce((total, char) => total + char.charCodeAt(0), 0) % 6;
}

export function ToolGlyph({ slug, size = 22 }: { slug: string; size?: number }) {
  const Icon = glyphs[slug] ?? FileText;
  return (
    <span className={`tool-glyph-art glyph-variant-${variant(slug)}`} aria-hidden="true">
      <Icon size={size} strokeWidth={1.8} />
      <b>{formatMark(slug)}</b>
    </span>
  );
}
