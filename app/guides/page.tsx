import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, BookOpen, FileImage, FileText, LockKeyhole, ScanText } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
<<<<<<< HEAD
import { getPosts } from "@/lib/blog";
=======
import { posts } from "@/lib/blog";
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40

export const metadata: Metadata = { title: "الأدلة", description: "أدلة عملية لفهم صيغ الملفات واختيار الإعدادات وحماية المستندات." };
const paths = [
  { icon: FileText, title: "أساسيات PDF", text: "الضغط، الدمج، التقسيم والأرشفة.", href: "/tools/pdf" },
  { icon: FileImage, title: "الصور والمستندات", text: "الجودة، الدقة والتحويل بين الصور وPDF.", href: "/tools/image" },
  { icon: ScanText, title: "النصوص وOCR", text: "تحويل المسح الضوئي إلى محتوى قابل للبحث.", href: "/tool/ocr-pdf" },
  { icon: LockKeyhole, title: "الخصوصية", text: "الحماية والتنقيح والتعامل مع الملفات الحساسة.", href: "/security" },
];
<<<<<<< HEAD
export default async function GuidesPage() { const posts = await getPosts(8); return <main><SiteHeader /><section className="guides-hero shell" data-reveal><div><span className="eyebrow"><span className="eyebrow-line" /> أدلة سياق</span><h1>افهم الملف.<br />ثم اختر الأداة.</h1><p>شرح عملي مختصر يربط المشكلة بالأداة والإعداد الصحيح.</p></div><BookOpen size={80} strokeWidth={1.2} /></section><section className="guide-paths shell" data-reveal>{paths.map(({ icon: Icon, title, text, href }, index) => <Link href={href} key={title}><span>0{index + 1}</span><Icon size={25} /><h2>{title}</h2><p>{text}</p><ArrowUpLeft size={18} /></Link>)}</section><section className="guide-library shell" data-reveal><div className="section-head rich-head"><div><span className="eyebrow">آخر الأدلة</span><h2>اقرأ، ثم نفّذ.</h2></div><Link href="/blog">المدونة كاملة <ArrowLeft size={17} /></Link></div><div>{posts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.readTime}</small></Link>)}</div></section><SiteFooter /></main>; }
=======
export default function GuidesPage() { return <main><SiteHeader /><section className="guides-hero shell"><div><span className="eyebrow"><span className="eyebrow-line" /> أدلة سياق</span><h1>افهم الملف.<br />ثم اختر الأداة.</h1><p>شرح عملي مختصر يربط المشكلة بالأداة والإعداد الصحيح.</p></div><BookOpen size={80} strokeWidth={1.2} /></section><section className="guide-paths shell">{paths.map(({ icon: Icon, title, text, href }, index) => <Link href={href} key={title}><span>0{index + 1}</span><Icon size={25} /><h2>{title}</h2><p>{text}</p><ArrowUpLeft size={18} /></Link>)}</section><section className="guide-library shell"><div className="section-head rich-head"><div><span className="eyebrow">آخر الأدلة</span><h2>اقرأ، ثم نفّذ.</h2></div><Link href="/blog">المدونة كاملة <ArrowLeft size={17} /></Link></div><div>{posts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.readTime}</small></Link>)}</div></section><SiteFooter /></main>; }

>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
