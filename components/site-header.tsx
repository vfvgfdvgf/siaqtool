"use client";

import Link from "next/link";
import { ArrowLeft, Menu, Search } from "lucide-react";
import { Brand } from "@/components/brand";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const mainNav = [
  { href: "/tools", label: "الأدوات" },
  { href: "/tools/pdf", label: "PDF" },
  { href: "/tools/office", label: "أوفيس والبيانات" },
  { href: "/tools/image", label: "الصور" },
  { href: "/tools/convert", label: "التحويل" },
  { href: "/blog", label: "المدونة" },
];

const exploreNav = [
  ...mainNav,
  { href: "/formats", label: "دليل الصيغ" },
  { href: "/workflows", label: "مسارات العمل" },
  { href: "/guides", label: "الأدلة" },
  { href: "/help", label: "مركز المساعدة" },
];

const popularTools = [
  { href: "/tool/merge-pdf", label: "دمج PDF" },
  { href: "/tool/compress-pdf", label: "ضغط PDF" },
  { href: "/tool/pdf-to-word", label: "PDF إلى Word" },
  { href: "/tool/word-to-pdf", label: "Word إلى PDF" },
  { href: "/tool/compress-image", label: "ضغط الصور" },
  { href: "/tool/image-to-text", label: "استخراج النص" },
];

export function SiteHeader() {
  return (
    <header className="site-header apple-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {mainNav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="apple-header-actions">
          <Link href="/tools" className="header-search" aria-label="البحث في الأدوات"><Search size={17} /></Link>
          <Link href="/tools" className="header-action">ابدأ <ArrowLeft size={14} /></Link>
          <Sheet>
            <SheetTrigger asChild><button className="apple-menu-trigger" type="button" aria-label="فتح قائمة الموقع"><Menu size={19} /></button></SheetTrigger>
            <SheetContent side="right" className="apple-nav-sheet">
              <SheetHeader><SheetTitle>استكشف سياق</SheetTitle><SheetDescription>الأدوات والموارد في مكان واحد.</SheetDescription></SheetHeader>
              <nav aria-label="قائمة الموقع">{exploreNav.map((item) => <SheetClose asChild key={item.href}><Link href={item.href}>{item.label}<ArrowLeft size={15} /></Link></SheetClose>)}</nav>
              <div className="sheet-status"><span /> الواجهة متاحة حاليًا</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <nav className="popular-tools-bar" aria-label="الأدوات الأكثر استخدامًا">
        <div className="shell">
          <strong>الأكثر استخدامًا</strong>
          {popularTools.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/tools" className="popular-tools-all">كل الأدوات <ArrowLeft size={13} /></Link>
        </div>
      </nav>
    </header>
  );
}
