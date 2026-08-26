"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export type HelpItem = {
  question: string;
  answer: string;
  tags: string;
};

export function HelpSearch({ items }: { items: HelpItem[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("ar");
  const results = useMemo(
    () => items.filter((item) => `${item.question} ${item.answer} ${item.tags}`.toLocaleLowerCase("ar").includes(normalized)),
    [items, normalized],
  );

  return (
    <>
      <label className="help-search-box">
        <Search size={19} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث: الحجم، الخصوصية، الهاتف…" aria-label="ابحث في مركز المساعدة" />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="مسح البحث"><X size={17} /></button>}
      </label>
      {query && (
        <section className="help-search-results" aria-live="polite">
          <div className="help-result-head"><strong>{results.length ? `${results.length} إجابات مطابقة` : "لا توجد نتيجة مطابقة"}</strong><span>جرّب كلمة أقصر أو اسم الصيغة</span></div>
          {results.map((item) => <details key={item.question} open={results.length === 1}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
        </section>
      )}
    </>
  );
}
