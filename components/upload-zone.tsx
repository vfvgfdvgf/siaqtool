"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { Download, FileCheck2, FileUp, LoaderCircle, LockKeyhole, Plus, Trash2, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UploadZoneProps = { accept: string; multiple?: boolean; minFiles?: number; toolTitle: string; toolSlug: string; ready: boolean };
type JobStatus = "idle" | "processing" | "success" | "error";

const DIRECT_API_BASE = process.env.NEXT_PUBLIC_SIAQ_API_URL?.replace(/\/$/, "");

export function UploadZone({ accept, multiple = false, minFiles = 1, toolTitle, toolSlug, ready }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<JobStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [password, setPassword] = useState("");
  const [watermarkText, setWatermarkText] = useState("سياق");
  const [angle, setAngle] = useState("90");
  const [quality, setQuality] = useState("balanced");
  const [optionText, setOptionText] = useState("سياق");
  const [pages, setPages] = useState("1");
  const [size, setSize] = useState("1600");
  const [margin, setMargin] = useState("12");
  const [strength, setStrength] = useState("1.2");
  const [rows, setRows] = useState("500");

  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); }, [downloadUrl]);

  function resetResult() {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(""); setDownloadName(""); setStatus("idle"); setProgress(0);
  }

  function selectFiles(selected: File[]) {
    resetResult();
    const allowed = accept.split(",").map((type) => type.trim().toLowerCase());
    const next = selected.filter((file) => allowed.some((type) => file.name.toLowerCase().endsWith(type)));
    if (next.length !== selected.length) setError(`الصيغ المقبولة: ${accept.replaceAll(".", "").toUpperCase()}`); else setError("");
    const safe = next.filter((file) => file.size <= 30 * 1024 * 1024);
    if (safe.length !== next.length) setError("الحد الأقصى للملف الواحد 30 ميجابايت.");
    setFiles((current) => multiple ? [...current, ...safe].slice(0, 12) : safe.slice(0, 1));
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) { selectFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); setDragging(false); selectFiles(Array.from(event.dataTransfer.files)); }
  function sizeLabel(bytes: number) { return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} ك.ب` : `${(bytes / 1024 / 1024).toFixed(1)} م.ب`; }

  function requestOptions() {
    if (toolSlug === "protect-pdf" || toolSlug === "unlock-pdf") return { password };
    if (toolSlug === "watermark") return { text: watermarkText };
    if (["watermark-image", "edit-pdf", "sign-pdf", "add-header-footer", "stamp-pdf"].includes(toolSlug)) return { text: optionText };
    if (["rotate-pdf", "rotate-image"].includes(toolSlug)) return { angle: Number(angle) };
    if (toolSlug === "compress-pdf") return { quality };
    if (toolSlug === "compress-image") return { quality: 82 };
    if (["delete-pdf-pages", "extract-pdf-pages", "duplicate-pdf-pages"].includes(toolSlug)) return { pages };
    if (["organize-pdf", "reorder-pdf-pages"].includes(toolSlug)) return { order: pages };
    if (toolSlug === "resize-image") return { size: Number(size) };
    if (toolSlug === "crop-pdf") return { margin: Number(margin) };
    if (toolSlug === "crop-image") return { crop: Number(margin) };
    if (toolSlug === "add-page-border" || toolSlug === "image-border") return { margin: Number(margin), border: Number(margin) };
    if (["brightness-image", "contrast-image"].includes(toolSlug)) return { strength: Number(strength) };
    if (toolSlug === "split-csv") return { rows: Number(rows) };
    return {};
  }

  async function processFiles() {
    if (!ready) { setError("هذه الأداة قيد التجهيز وستتاح قريبًا."); return; }
    if (!files.length) { setError("اختر ملفًا أولًا."); return; }
    if (files.length < minFiles) { setError(`اختر ${minFiles} ملفات على الأقل لهذه الأداة.`); return; }
    if ((toolSlug === "protect-pdf" || toolSlug === "unlock-pdf") && password.length < 6) { setError("اكتب كلمة مرور من 6 أحرف على الأقل."); return; }

    resetResult(); setError(""); setStatus("processing"); setProgress(35);
    try {
      const form = new FormData(); files.forEach((file) => form.append("files", file)); form.append("options", JSON.stringify(requestOptions()));
      const endpoint = DIRECT_API_BASE ? `${DIRECT_API_BASE}/tools/${toolSlug}/process/` : `/api/process/${toolSlug}`;
      const response = await fetch(endpoint, { method: "POST", body: form, headers: { Accept: "application/octet-stream, application/json" } });
      if (!response.ok) {
        let message = "تعذر إكمال المعالجة.";
        try { const payload = await response.json(); if (payload.error) message = payload.error; } catch { /* keep safe message */ }
        throw new Error(message);
      }
      setProgress(100);
      const blob = await response.blob(); const url = URL.createObjectURL(blob);
      const disposition = response.headers.get("content-disposition") || "";
      const match = disposition.match(/filename\*?=(?:UTF-8''|\")?([^";]+)/i);
      setDownloadName(match ? decodeURIComponent(match[1].replace(/"$/, "")) : `siaq-result-${Date.now()}`);
      setDownloadUrl(url); setStatus("success");
    } catch (reason) {
      setStatus("error"); setError(reason instanceof Error && reason.message !== "Failed to fetch" ? reason.message : "تعذّر الاتصال بالخدمة الآن. حاول مرة أخرى بعد قليل.");
    }
  }

  const hasOptions = [
    "protect-pdf", "unlock-pdf", "watermark", "watermark-image", "edit-pdf", "sign-pdf",
    "add-header-footer", "stamp-pdf", "rotate-pdf", "rotate-image", "compress-pdf",
    "delete-pdf-pages", "extract-pdf-pages", "duplicate-pdf-pages", "organize-pdf",
    "reorder-pdf-pages", "resize-image", "crop-pdf", "crop-image", "add-page-border",
    "image-border", "brightness-image", "contrast-image", "split-csv",
  ].includes(toolSlug);

  return (
    <div className="upload-workspace">
      <div className={`engine-status ${ready ? "ready" : "queued"}`}><span>{ready ? "جاهزة للاستخدام" : "قريبًا"}</span><small>{ready ? "معالجة آمنة ومؤقتة" : "نعمل على إتاحتها"}</small></div>
      <div className={`drop-zone ${dragging ? "dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={onInput} className="sr-only" />
        <div className="drop-icon"><FileUp size={29} /></div>
        <strong>{files.length ? "أضف ملفات أخرى" : multiple ? "اختر الملفات" : "اختر ملفًا"}</strong>
        <p>أو اسحب {multiple ? "الملفات" : "الملف"} وأفلته هنا</p>
        <Button type="button" size="lg" onClick={() => inputRef.current?.click()} className="upload-button"><Plus size={17} /> تصفّح الجهاز</Button>
        <small>{accept.replaceAll(".", "").toUpperCase()} · حتى 30 ميجابايت</small>
      </div>

      {error && <p className="upload-error" role="alert"><WifiOff size={15} /> {error}</p>}
      {files.length > 0 && (
        <div className="selected-files" aria-live="polite">
          <div className="selected-head"><span>{files.length} {files.length === 1 ? "ملف جاهز" : "ملفات جاهزة"}</span><button onClick={() => { setFiles([]); resetResult(); }}>إزالة الكل</button></div>
          {files.map((file, index) => (
            <div className="file-row" key={`${file.name}-${file.lastModified}-${index}`}>
              <span className="file-state"><FileCheck2 size={19} /></span>
              <div><strong>{file.name}</strong><small>{sizeLabel(file.size)}</small></div>
              <button aria-label={`إزالة ${file.name}`} onClick={() => { setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index)); resetResult(); }}><Trash2 size={17} /></button>
            </div>
          ))}

          {hasOptions && <div className="tool-options">
            {(toolSlug === "protect-pdf" || toolSlug === "unlock-pdf") && <label><span>كلمة المرور</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="6 أحرف على الأقل" autoComplete="new-password" /></label>}
            {toolSlug === "watermark" && <label><span>نص العلامة</span><input type="text" value={watermarkText} onChange={(event) => setWatermarkText(event.target.value)} maxLength={80} /></label>}
            {["watermark-image", "edit-pdf", "sign-pdf", "add-header-footer", "stamp-pdf"].includes(toolSlug) && <label><span>النص</span><input type="text" value={optionText} onChange={(event) => setOptionText(event.target.value)} maxLength={100} /></label>}
            {["delete-pdf-pages", "extract-pdf-pages", "duplicate-pdf-pages", "organize-pdf", "reorder-pdf-pages"].includes(toolSlug) && <label><span>{toolSlug.includes("order") || toolSlug === "organize-pdf" ? "ترتيب الصفحات" : "أرقام الصفحات"}</span><input type="text" dir="ltr" value={pages} onChange={(event) => setPages(event.target.value)} placeholder="1, 3-5" /></label>}
            {toolSlug === "resize-image" && <label><span>أكبر ضلع بالبكسل</span><input type="number" min="320" max="6000" value={size} onChange={(event) => setSize(event.target.value)} /></label>}
            {(toolSlug === "crop-pdf" || toolSlug === "crop-image") && <label><span>{toolSlug === "crop-pdf" ? "الهامش بالنقاط" : "نسبة القص من الحواف"}</span><input type="number" min="0" max={toolSlug === "crop-pdf" ? "72" : "40"} value={margin} onChange={(event) => setMargin(event.target.value)} /></label>}
            {(toolSlug === "add-page-border" || toolSlug === "image-border") && <label><span>{toolSlug === "add-page-border" ? "هامش الإطار" : "عرض الإطار بالبكسل"}</span><input type="number" min="2" max={toolSlug === "add-page-border" ? "72" : "240"} value={margin} onChange={(event) => setMargin(event.target.value)} /></label>}
            {["brightness-image", "contrast-image"].includes(toolSlug) && <label><span>قوة التأثير</span><input type="number" min="0.2" max="3" step="0.1" value={strength} onChange={(event) => setStrength(event.target.value)} /></label>}
            {toolSlug === "split-csv" && <label><span>عدد الصفوف في كل ملف</span><input type="number" min="100" max="5000" step="100" value={rows} onChange={(event) => setRows(event.target.value)} /></label>}
            {(toolSlug === "rotate-pdf" || toolSlug === "rotate-image") && <fieldset><legend>زاوية التدوير</legend><RadioGroup value={angle} onValueChange={setAngle} className="option-radio">{["90", "180", "270"].map((value) => <label key={value}><RadioGroupItem value={value} />{value}°</label>)}</RadioGroup></fieldset>}
            {toolSlug === "compress-pdf" && <fieldset><legend>مستوى الضغط</legend><RadioGroup value={quality} onValueChange={setQuality} className="option-radio">{[["screen", "أعلى ضغط"], ["balanced", "متوازن"], ["print", "طباعة"]].map(([value, label]) => <label key={value}><RadioGroupItem value={value} />{label}</label>)}</RadioGroup></fieldset>}
          </div>}

          {status === "processing" && <div className="processing-state"><div><span><LoaderCircle size={16} /> تتم المعالجة…</span><small>{progress}%</small></div><Progress value={progress} aria-label="تقدم المعالجة" /></div>}
          {status === "success" && <a className="download-result" href={downloadUrl} download={downloadName}><Download size={18} /> تنزيل النتيجة</a>}
          {status !== "success" && <Button type="button" onClick={processFiles} disabled={status === "processing"} className="process-button">{status === "processing" ? "جارٍ العمل…" : toolTitle}</Button>}
          <p className="prototype-note"><LockKeyhole size={14} /> تُعالج الملفات مؤقتًا ولا تُحفظ في قاعدة بيانات.</p>
        </div>
      )}
    </div>
  );
}
