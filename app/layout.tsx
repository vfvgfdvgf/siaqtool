import type { Metadata } from "next";
import "./globals.css";
import "./apple.css";
<<<<<<< HEAD
import { MotionObserver } from "@/components/motion-observer";

export const metadata: Metadata = {
  title: { default: "سياق — 100 أداة لتحويل وتعديل الملفات", template: "%s | سياق" },
  description: "منصة عربية تضم أدوات PDF وWord وExcel وPowerPoint والصور للتحويل والضغط والتنظيم والحماية بخطوات واضحة.",
=======

export const metadata: Metadata = {
  title: { default: "سياق — أدوات تحويل الملفات", template: "%s | سياق" },
  description: "أدوات عربية بسيطة لتحويل ودمج وضغط وتعديل ملفات PDF والمستندات.",
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
<<<<<<< HEAD
  return <html lang="ar" dir="rtl"><body><MotionObserver /><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div id="main-content">{children}</div></body></html>;
=======
  return <html lang="ar" dir="rtl"><body><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div id="main-content">{children}</div></body></html>;
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
}
