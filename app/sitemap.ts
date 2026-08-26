import type { MetadataRoute } from "next";
import { categories, tools } from "@/lib/content";
import { getPosts } from "@/lib/blog";

const origin = "https://getsiaq.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPages = ["", "/tools", "/formats", "/workflows", "/guides", "/blog", "/about", "/security", "/help", "/accessibility", "/contact"];
  return [
    ...staticPages.map((path, index) => ({ url: `${origin}${path}`, changeFrequency: index < 2 ? "daily" as const : "monthly" as const, priority: index === 0 ? 1 : index === 1 ? .95 : .65 })),
    ...categories.map((category) => ({ url: `${origin}/tools/${category}`, changeFrequency: "weekly" as const, priority: .85 })),
    ...tools.map((tool) => ({ url: `${origin}/tool/${tool.slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    ...posts.map((post) => ({ url: `${origin}/blog/${post.slug}`, changeFrequency: "monthly" as const, priority: .6 })),
  ];
}
