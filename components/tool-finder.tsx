"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowUpLeft, Search, X } from "lucide-react";
import { ToolGlyph } from "@/components/tool-glyph";
import { availableToolSlugs, tools, type ToolCategory } from "@/lib/content";

const filters: Array<{ key: "all" | ToolCategory; label: string }> = [
  { key: "all", label: "الكل" }, { key: "pdf", label: "PDF" },
  { key: "office", label: "أوفيس وبيانات" }, { key: "image", label: "الصور" },
  { key: "convert", label: "تحويلات" }, { key: "edit", label: "تعديل وحماية" },
  { key: "smart", label: "ذكية" },
];

export function ToolFinder({ limit, compact = false }: { limit?: number; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ToolCategory>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const normalized = query.trim().toLowerCase();

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (event.key === "/" && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const matching = useMemo(() => tools.filter((tool) => {
    const inCategory = filter === "all" || tool.category === filter;
    const haystack = `${tool.title} ${tool.short} ${tool.slug} ${tool.accept}`.toLowerCase();
    return inCategory && (!normalized || haystack.includes(normalized));
  }), [filter, normalized]);

  const visible = limit && !normalized && filter === "all" ? matching.slice(0, limit) : matching;
  const clear = () => { setQuery(""); setFilter("all"); inputRef.current?.focus(); };

  return (
    <section className={`tools-section shell ${compact ? "compact-tools-section" : ""}`} id="tools" aria-labelledby="tools-title">
      <div className="tool-finder-head">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" /> مكتبة الأدوات</span>
          <h2 id="tools-title">ابحث بالمهمة أو الصيغة.</h2>
          <p>{tools.length} أداة تعمل من مساحة واحدة؛ اختر ما تريد وابدأ مباشرة.</p>
        </div>
        <label className="tool-search">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">ابحث عن أداة أو صيغة ملف</span>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="مثال: ضغط PDF أو Excel إلى Word" autoComplete="off" />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="مسح البحث"><X size={16} /></button> : <kbd>/</kbd>}
        </label>
      </div>

      <div className="tool-filter-line">
        <div className="filter-row deep-filters" role="group" aria-label="تصفية الأدوات">
          {filters.map((item) => {
            const count = item.key === "all" ? tools.length : tools.filter((tool) => tool.category === item.key).length;
            return <button type="button" key={item.key} className={filter === item.key ? "active" : ""} onClick={() => setFilter(item.key)} aria-pressed={filter === item.key}>{item.label}<span>{count}</span></button>;
          })}
        </div>
        <span className="tool-result-count" aria-live="polite">{matching.length} نتيجة</span>
      </div>

      {visible.length > 0 ? (
        <div className="tool-grid deep-tool-grid">
          {visible.map((tool) => (
            <Link href={`/tool/${tool.slug}`} className={`tool-card deep-tool-card tone-${tool.category}`} key={tool.slug}>
              <div className="tool-icon"><ToolGlyph slug={tool.slug} /></div>
              <div className="tool-copy">
                <div className="tool-title-line"><h3>{tool.title}</h3>{tool.badge && <span>{tool.badge}</span>}</div>
                <p>{tool.short}</p>
                <small><i className={availableToolSlugs.has(tool.slug) ? "engine-dot active" : "engine-dot"} />{availableToolSlugs.has(tool.slug) ? "جاهزة الآن" : "قريبًا"}</small>
              </div>
              <span className="card-open" aria-hidden="true"><ArrowUpLeft size={17} /></span>
            </Link>
          ))}
        </div>
      ) : <div className="empty-tools"><Search size={22} /><div><strong>لا توجد أداة مطابقة.</strong><p>جرّب اسم صيغة مثل PDF أو مهمة مثل ضغط.</p></div><button type="button" onClick={clear}>عرض كل الأدوات</button></div>}

      {limit && !normalized && filter === "all" && <div className="all-tools-link"><Link href="/tools">عرض مكتبة الأدوات كاملة <ArrowLeft size={17} /></Link><span>{tools.length - visible.length} أداة أخرى مرتبة حسب النوع</span></div>}
    </section>
  );
}
