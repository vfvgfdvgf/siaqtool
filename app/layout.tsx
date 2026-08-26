import type { Metadata } from "next";
import "./globals.css";
import "./practical.css";

export const metadata: Metadata = {
  title: { default: "سياق — 100 أداة لتحويل وتعديل الملفات", template: "%s | سياق" },
  description: "منصة عربية تضم أدوات PDF وWord وExcel وPowerPoint والصور للتحويل والضغط والتنظيم والحماية بخطوات واضحة.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div id="main-content">{children}</div></body></html>;
}
