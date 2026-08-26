import type { Metadata } from "next";
import "./globals.css";
import "./apple.css";

export const metadata: Metadata = {
  title: { default: "سياق — أدوات تحويل الملفات", template: "%s | سياق" },
  description: "أدوات عربية بسيطة لتحويل ودمج وضغط وتعديل ملفات PDF والمستندات.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><div id="main-content">{children}</div></body></html>;
}
