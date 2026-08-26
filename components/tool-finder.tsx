"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpLeft, Search } from "lucide-react";
import { ToolGlyph } from "@/components/tool-glyph";
<<<<<<< HEAD
import { availableToolSlugs, categoryLabels, tools, type ToolCategory } from "@/lib/content";
=======
import { categoryLabels, djangoToolSlugs, tools, type ToolCategory } from "@/lib/content";
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40

const filters: Array<{ key: "all" | ToolCategory; label: string }> = [
  { key: "all", label: "كل الأدوات" }, { key: "pdf", label: "PDF" },
  { key: "office", label: "أوفيس" }, { key: "image", label: "الصور" },
  { key: "convert", label: "تحويلات أخرى" }, { key: "edit", label: "التعديل والحماية" },
  { key: "smart", label: "الذكية" },
];

export function ToolFinder({ limit }: { limit?: number }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ToolCategory>("all");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const results = tools.filter((tool) => (filter === "all" || tool.category === filter) && (!normalized || `${tool.title} ${tool.short}`.toLowerCase().includes(normalized)));
    return limit && !normalized && filter === "all" ? results.slice(0, limit) : results;
  }, [filter, limit, query]);

  return (
<<<<<<< HEAD
    <section className="tools-section shell" id="tools" aria-labelledby="tools-title" data-reveal>
=======
    <section className="tools-section shell" id="tools" aria-labelledby="tools-title">
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
      <div className="section-head rich-head">
        <div><span className="eyebrow"><span className="eyebrow-line" /> مكتبة الأدوات</span><h2 id="tools-title">كل ما يحتاجه ملفك.</h2><p>اختر المهمة، أضف الملف، واضبط النتيجة كما تريد.</p></div>
        <label className="tool-search"><Search size={18} aria-hidden="true" /><span className="sr-only">ابحث عن أداة</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن أداة أو صيغة…" /><kbd>/</kbd></label>
      </div>
      <div className="filter-row deep-filters" role="group" aria-label="تصفية الأدوات">
        {filters.map((item) => <button key={item.key} className={filter === item.key ? "active" : ""} onClick={() => setFilter(item.key)} aria-pressed={filter === item.key}>{item.label}</button>)}
      </div>
      {filtered.length > 0 ? (
        <div className="tool-grid deep-tool-grid">
          {filtered.map((tool, index) => (
            <Link href={`/tool/${tool.slug}`} className={`tool-card deep-tool-card tone-${tool.category}`} key={tool.slug}>
              <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="tool-icon"><ToolGlyph slug={tool.slug} /></div>
              <div className="tool-copy">
                <div className="tool-title-line"><h3>{tool.title}</h3>{tool.badge && <span>{tool.badge}</span>}</div>
                <p>{tool.short}</p>
<<<<<<< HEAD
                <small><i className={availableToolSlugs.has(tool.slug) ? "engine-dot active" : "engine-dot"} /> {availableToolSlugs.has(tool.slug) ? "جاهزة للاستخدام" : categoryLabels[tool.category]}</small>
=======
                <small><i className={djangoToolSlugs.has(tool.slug) ? "engine-dot active" : "engine-dot"} /> {djangoToolSlugs.has(tool.slug) ? "المحرك مجهّز" : categoryLabels[tool.category]}</small>
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
              </div>
              <span className="card-open"><ArrowUpLeft size={17} /></span>
            </Link>
          ))}
        </div>
      ) : <div className="empty-tools"><Search size={22} /><p>لم نجد أداة بهذا الاسم.</p><button onClick={() => { setQuery(""); setFilter("all"); }}>عرض كل الأدوات</button></div>}
      {limit && !query && filter === "all" && <div className="all-tools-link"><Link href="/tools">استعرض الأدوات كاملة <ArrowLeft size={17} /></Link><span>{tools.length} أداة في 6 أقسام</span></div>}
    </section>
  );
}
