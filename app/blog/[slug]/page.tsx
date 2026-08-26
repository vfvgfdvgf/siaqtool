import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() { return posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug); return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug); if (!post) notFound();
  return (
    <main>
      <SiteHeader />
      <article className="article-page shell">
        <Link href="/blog" className="back-link"><ArrowRight size={16} /> المدونة</Link>
        <header><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div><time>{post.date}</time><span><Clock3 size={14} /> {post.readTime}</span></div></header>
        <div className="article-body">
          {post.paragraphs.map((block, index) => <section key={index}>{block.heading && <h2>{block.heading}</h2>}<p>{block.text}</p></section>)}
        </div>
        <div className="article-cta"><strong>أنجزها الآن</strong><p>اختر الأداة المناسبة واترك الخطوات لسياق.</p><Link href="/#tools">عرض الأدوات</Link></div>
      </article>
      <SiteFooter />
    </main>
  );
}

