import type { Metadata } from "next";
import Link from "next/link";
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

