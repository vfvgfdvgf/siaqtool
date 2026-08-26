import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, Workflow } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "مسارات العمل", description: "وصفات جاهزة تجمع أدوات سياق لإنجاز مهام الملفات متعددة الخطوات.", alternates: { canonical: "/workflows" } };
const workflows = [
  { title: "إرسال عقد بأمان", result: "ملف خفيف ومحمي", steps: [["ضغط PDF", "/tool/compress-pdf"], ["حماية PDF", "/tool/protect-pdf"]] },
  { title: "أرشفة مستند ممسوح", result: "نسخة قابلة للبحث والأرشفة", steps: [["OCR PDF", "/tool/ocr-pdf"], ["PDF/A", "/tool/pdfa"]] },
  { title: "تقرير من عدة مصادر", result: "تقرير واحد مرقم", steps: [["إكسيل إلى PDF", "/tool/excel-to-pdf"], ["دمج PDF", "/tool/merge-pdf"], ["أرقام الصفحات", "/tool/page-numbers"]] },
  { title: "صور إلى مستند", result: "PDF مرتب وخفيف", steps: [["تغيير الحجم", "/tool/resize-image"], ["JPG إلى PDF", "/tool/jpg-to-pdf"], ["ضغط PDF", "/tool/compress-pdf"]] },
  { title: "مراجعة نسختين", result: "تقرير بالفروقات", steps: [["مقارنة PDF", "/tool/compare-pdf"], ["تنقيح PDF", "/tool/redact-pdf"]] },
  { title: "مشاركة عرض نهائي", result: "PDF موقع وجاهز", steps: [["بوربوينت إلى PDF", "/tool/powerpoint-to-pdf"], ["توقيع PDF", "/tool/sign-pdf"]] },
];
export default function WorkflowsPage() { return <main><SiteHeader /><section className="workflows-hero shell"><div><span className="eyebrow"><span className="eyebrow-line" /> مسارات العمل</span><h1>أكثر من أداة.<br />نتيجة واحدة.</h1><p>وصفات مرتبة للمهام التي تحتاج أكثر من خطوة، مع نقطة بداية واضحة.</p></div><figure><Image src="/images/siaq-three-stage-workflow.webp" alt="ثلاث مراحل متصلة لمعالجة المستندات" width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 55vw" /></figure></section><section className="workflow-recipes shell">{workflows.map((item, index) => <article key={item.title}><div><span>0{index + 1}</span><Workflow size={21} /></div><h2>{item.title}</h2><p>{item.result}</p><ol>{item.steps.map(([label, href], stepIndex) => <li key={href}><Link href={href}>{label}</Link>{stepIndex < item.steps.length - 1 && <ChevronLeft size={14} />}</li>)}</ol><Link href={item.steps[0][1]}>ابدأ المسار <ArrowLeft size={16} /></Link></article>)}</section><SiteFooter /></main>; }
