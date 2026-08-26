import type { Metadata } from "next";
import "./globals.css";
import "./practical.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://getsiaq.com"),
  title: { default: "سياق — 146 أداة لتحويل وتعديل الملفات", template: "%s | سياق" },
  description: "منصة عربية تضم 146 أداة فعلية لتحويل وضغط وتنظيم ملفات PDF وWord وExcel وPowerPoint والصور والبيانات دون تسجيل.",
  applicationName: "سياق",
  category: "أدوات الملفات والإنتاجية",
  keywords: ["تحويل PDF", "ضغط PDF", "دمج PDF", "PDF إلى Word", "Word إلى PDF", "تحويل الصور", "أدوات ملفات", "سياق"],
  authors: [{ name: "سياق", url: "https://getsiaq.com" }],
  creator: "سياق",
  publisher: "سياق",
  alternates: { canonical: "/", languages: { "ar-SA": "/" } },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    siteName: "سياق",
    title: "سياق — 146 أداة لتحويل وتعديل الملفات",
    description: "حوّل واضغط ونظّم ملفات PDF وأوفيس والصور والبيانات من مساحة عربية واحدة.",
  },
  twitter: { card: "summary", title: "سياق — أدوات الملفات العربية", description: "146 أداة لتحويل وضغط وتنظيم الملفات دون تسجيل." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div id="main-content">{children}</div></body></html>;
}
