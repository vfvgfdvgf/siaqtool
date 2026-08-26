import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "سياق لتحويل الملفات",
    short_name: "سياق",
    description: "146 أداة عربية لتحويل وضغط وتنظيم الملفات.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d9232e",
    lang: "ar",
    dir: "rtl",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
