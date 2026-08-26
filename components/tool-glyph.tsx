import type { LucideIcon } from "lucide-react";
import {
  Archive, ArrowLeftRight, BookOpenCheck, Braces, Crop, FileArchive, FileImage,
  FileLock2, FileOutput, Files, FileScan, FileSignature, FileSpreadsheet,
  FileText, FormInput, Image as ImageIcon, ImageDown, ImagePlus, Languages, ListFilter, Minimize2,
  Presentation, Redo2, RotateCw, ScanText, Scissors, ShieldCheck, Sparkles,
  Stamp, Table2, TextCursorInput, Unlock, WandSparkles,
} from "lucide-react";

const glyphs: Record<string, LucideIcon> = {
  "merge-pdf": Files, "split-pdf": Scissors, "compress-pdf": Minimize2,
  "organize-pdf": ListFilter, "rotate-pdf": RotateCw, "crop-pdf": Crop,
  "repair-pdf": Redo2, pdfa: Archive, "page-numbers": TextCursorInput,
  "pdf-to-word": FileText, "pdf-to-powerpoint": Presentation, "pdf-to-excel": Table2,
  "word-to-pdf": FileOutput, "powerpoint-to-pdf": FileOutput, "excel-to-pdf": FileSpreadsheet,
  "pdf-to-jpg": FileImage, "jpg-to-pdf": ImagePlus, "html-to-pdf": Braces,
  "pdf-to-markdown": BookOpenCheck, "edit-pdf": WandSparkles, "sign-pdf": FileSignature,
  watermark: Stamp, "unlock-pdf": Unlock, "protect-pdf": FileLock2,
  "redact-pdf": ShieldCheck, "pdf-forms": FormInput, "ocr-pdf": ScanText,
  "compare-pdf": ArrowLeftRight, "summarize-pdf": Sparkles, "translate-pdf": Languages,
  "scan-to-pdf": FileScan, "compress-image": ImageDown, "resize-image": Crop,
  "png-to-jpg": FileImage, "webp-to-jpg": FileImage, "heic-to-jpg": FileImage,
  "svg-to-png": FileImage, "image-to-text": ScanText, "zip-files": FileArchive,
};

export function ToolGlyph({ slug, size = 22 }: { slug: string; size?: number }) {
  const Icon = glyphs[slug]
    ?? (/excel|xlsx|xls|csv|ods|table/.test(slug) ? FileSpreadsheet : undefined)
    ?? (/powerpoint|ppt|odp|presentation/.test(slug) ? Presentation : undefined)
    ?? (/image|jpg|jpeg|png|webp|heic|svg|bmp|tiff|gif|avif|ico/.test(slug) ? ImageIcon : undefined)
    ?? (/zip|archive/.test(slug) ? FileArchive : undefined)
    ?? FileText;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
