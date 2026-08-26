import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type Section = { title: string; text: string };

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: Section[] }) {
  return (
    <main>
      <SiteHeader />
      <article className="legal-page shell">
        <Link href="/" className="back-link"><ArrowRight size={16} /> الرئيسية</Link>
        <header><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p><span className="legal-date"><CalendarDays size={14} /> آخر تحديث: 26 أغسطس 2026</span></header>
        <div className="legal-body">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
        <aside>لديك سؤال عن هذه الصفحة؟ <Link href="/contact">تواصل معنا</Link> وسنوضح لك ما تحتاجه.</aside>
      </article>
      <SiteFooter />
    </main>
  );
}
