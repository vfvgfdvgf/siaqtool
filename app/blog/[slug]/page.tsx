import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, UserRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() { return posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.metaTitle || post.title, description: post.metaDescription || post.excerpt, alternates: { canonical: `/blog/${post.slug}` } } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return (
    <main>
      <SiteHeader />
      <article className="article-page shell">
        <Link href="/blog" className="back-link"><ArrowRight size={16} /> المدونة</Link>
        <header data-reveal>
          <span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p>
          <div><time>{post.date}</time><span><Clock3 size={14} /> {post.readTime}</span><span><UserRound size={14} /> {post.author || "فريق سياق"}</span></div>
        </header>
        {post.coverImage && <figure className="article-cover" data-reveal><Image src={post.coverImage} alt={post.coverAlt || post.title} width={1500} height={844} priority sizes="(max-width: 1080px) 100vw, 1040px" /></figure>}
        {post.bodyHtml ? (
          <div className="article-body rich-article-body" data-reveal dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        ) : (
          <div className="article-body" data-reveal>
            {post.paragraphs?.map((block, index) => <section key={index}>{block.heading && <h2>{block.heading}</h2>}<p>{block.text}</p></section>)}
          </div>
        )}
        <div className="article-cta" data-reveal><strong>أنجزها الآن</strong><p>اختر الأداة المناسبة وابدأ بخطوات واضحة.</p><Link href="/#tools">عرض الأدوات</Link></div>
      </article>
      <SiteFooter />
    </main>
  );
}
