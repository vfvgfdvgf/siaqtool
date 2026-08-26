import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
<<<<<<< HEAD
import { ArrowRight, Clock3, UserRound } from "lucide-react";
=======
import { ArrowRight, Clock3 } from "lucide-react";
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() { return posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
<<<<<<< HEAD
  const post = await getPost((await params).slug);
  return post ? { title: post.metaTitle || post.title, description: post.metaDescription || post.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
=======
  const post = getPost((await params).slug); return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug); if (!post) notFound();
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
  return (
    <main>
      <SiteHeader />
      <article className="article-page shell">
        <Link href="/blog" className="back-link"><ArrowRight size={16} /> المدونة</Link>
<<<<<<< HEAD
        <header data-reveal>
          <span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p>
          <div><time>{post.date}</time><span><Clock3 size={14} /> {post.readTime}</span><span><UserRound size={14} /> {post.author || "فريق سياق"}</span></div>
        </header>
        {post.coverImage && <figure className="article-cover" data-reveal><img src={post.coverImage} alt={post.coverAlt || post.title} fetchPriority="high" /></figure>}
        {post.bodyHtml ? (
          <div className="article-body rich-article-body" data-reveal dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        ) : (
          <div className="article-body" data-reveal>
            {post.paragraphs?.map((block, index) => <section key={index}>{block.heading && <h2>{block.heading}</h2>}<p>{block.text}</p></section>)}
          </div>
        )}
        <div className="article-cta" data-reveal><strong>أنجزها الآن</strong><p>اختر الأداة المناسبة وابدأ بخطوات واضحة.</p><Link href="/#tools">عرض الأدوات</Link></div>
=======
        <header><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div><time>{post.date}</time><span><Clock3 size={14} /> {post.readTime}</span></div></header>
        <div className="article-body">
          {post.paragraphs.map((block, index) => <section key={index}>{block.heading && <h2>{block.heading}</h2>}<p>{block.text}</p></section>)}
        </div>
        <div className="article-cta"><strong>أنجزها الآن</strong><p>اختر الأداة المناسبة واترك الخطوات لسياق.</p><Link href="/#tools">عرض الأدوات</Link></div>
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
      </article>
      <SiteFooter />
    </main>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
