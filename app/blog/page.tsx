import type { Metadata } from "next";
import Link from "next/link";
<<<<<<< HEAD
import { ArrowUpLeft, BookOpen, Clock3 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "المدونة", description: "أدلة قصيرة وعملية للتعامل مع ملفات PDF والمستندات والصور بثقة." };

export default async function BlogPage() {
  const articles = await getPosts();
  return (
    <main>
      <SiteHeader />
      <section className="blog-showcase shell" data-reveal>
        <div>
          <span className="eyebrow"><span className="eyebrow-line" /> مدونة سياق</span>
          <h1>افهم ملفك.<br /><em>واختر بثقة.</em></h1>
          <p>أدلة عملية قصيرة تربط كل مشكلة بالصيغة والإعداد والأداة المناسبة.</p>
          <span className="blog-showcase-count"><BookOpen size={16} /> {articles.length} أدلة متاحة</span>
        </div>
        <figure><img src="/images/siaq-knowledge-hub.webp" alt="مكتبة أدلة ومجلدات منظمة لمركز معرفة سياق" fetchPriority="high" /></figure>
      </section>
      <section className="blog-index shell" data-reveal>
        <div className="blog-index-head"><span>أحدث الأدلة</span><p>محتوى واضح دون حشو أو مصطلحات معقدة.</p></div>
        <div className="post-grid image-post-grid">
          {articles.map((post, index) => (
            <Link href={`/blog/${post.slug}`} className={index === 0 ? "post-card featured" : "post-card"} key={post.slug}>
              {post.coverImage && <figure><img src={post.coverImage} alt={post.coverAlt || post.title} loading={index === 0 ? "eager" : "lazy"} decoding="async" /></figure>}
              <div className="post-meta"><span>{post.category}</span><span><Clock3 size={13} /> {post.readTime}</span></div>
=======
import { ArrowUpLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { posts } from "@/lib/blog";

export const metadata: Metadata = { title: "المدونة", description: "أدلة قصيرة وعملية للتعامل مع ملفات PDF والمستندات بأمان." };

export default function BlogPage() {
  return (
    <main>
      <SiteHeader />
      <section className="blog-index shell">
        <div className="simple-heading"><span className="eyebrow">مدونة سياق</span><h1>دليل ملفاتك.</h1><p>إجابات قصيرة تساعدك على اختيار الصيغة والتعامل مع المستندات بثقة.</p></div>
        <div className="post-grid">
          {posts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} className={index === 0 ? "post-card featured" : "post-card"} key={post.slug}>
              <div className="post-meta"><span>{post.category}</span><span>{post.readTime}</span></div>
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
              <h2>{post.title}</h2><p>{post.excerpt}</p>
              <div className="post-foot"><time>{post.date}</time><ArrowUpLeft size={19} /></div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
